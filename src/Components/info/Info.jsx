import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getNasaImages } from '../nasaApi';
import { Button, Modal, Box, TextField, Typography, InputLabel, FormControl } from '@mui/material';
import { ReactSketchCanvas } from 'react-sketch-canvas';

const Info = () => {
  const location = useLocation();
  const imageId = location.state?.imageId;

  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [note, setNote] = useState("");
  const [drawing, setDrawing] = useState(null);
  const [brushColor, setBrushColor] = useState("#000000");
  const [isBold, setIsBold] = useState(false);
  const [selectedText, setSelectedText] = useState("");

  // UseEffect p obtener los datos de la imagen
  useEffect(() => {
    if (imageId) {  // Solo si el ID está disponible
      const fetchImageData = async () => {
        try {
          const fetchedImages = await getNasaImages();
          const image = fetchedImages.find(item => item.data[0].nasa_id === imageId); // Buscar imagen por ID
          if (image) {
            setImageData(image);
          } else {
            setError("Imagen no encontrada");
          }
          setLoading(false);
        } catch (err) {
          setError("Error al obtener los detalles de la imagen: " + err.message);
          setLoading(false);
        }
      };

      fetchImageData();
    } else {
      setLoading(false);
      setError("ID de imagen no disponible");
    }
  }, [imageId]); // Solo se ejecuta cuando cambia el ID de la imagen y ya no coicide

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setBrushColor("#000000");
    setNote(""); // Limpiar
    setDrawing(null); // Limpiar
    setOpenModal(false);
  };

  // Guardar el dibujo y la nota en archivos
  const handleSaveDrawing = () => {
    if (!note && !drawing) {
      alert("Por favor, agrega una anotación o un dibujo antes de guardar.");
      return;
    }

    const imageUrl = drawing ? drawing.getDataURL() : "";
    const imageBlob = imageUrl ? dataURLtoBlob(imageUrl) : null; 
    const imageFile = imageBlob ? new Blob([imageBlob], { type: 'image/png' }) : null;

    // Creaarchivo
    const textFile = new Blob([note], { type: 'text/plain' });

    // Creardescarga
    if (imageFile) {
      const imageDownloadUrl = URL.createObjectURL(imageFile);
      const imageLink = document.createElement('a');
      imageLink.href = imageDownloadUrl;
      imageLink.download = 'dibujo.png';
      imageLink.click();
    }

    const textDownloadUrl = URL.createObjectURL(textFile);
    const textLink = document.createElement('a');
    textLink.href = textDownloadUrl;
    textLink.download = 'anotacion.txt';
    textLink.click();

    setOpenModal(false);
  };


  const dataURLtoBlob = (dataURL) => {
    const [base64Header, base64Data] = dataURL.split(',');
    const byteString = atob(base64Data);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }

    return new Blob([uint8Array], { type: 'image/png' });
  };

  // Color pincel
  const handleBrushColorChange = (event) => {
    setBrushColor(event.target.value);
  };

  const handleBoldText = () => {
    if (selectedText) {
      setNote(note.replace(selectedText, `<b>${selectedText}</b>`));
      setSelectedText("");
    } else {
      setIsBold(!isBold);
    }
  };

  const handleTextSelect = (event) => {
    const text = window.getSelection().toString();
    setSelectedText(text); // Guardar txt
  };

  if (loading) {
    return <p>Cargando detalles...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      {imageData ? (
        <div>
          <h1>{imageData.data[0].title}</h1>
          
          {/* Imagen + nueva ventana */}
          <a href={imageData.links && imageData.links.length > 0 ? imageData.links[0].href : '#'} target="_blank" rel="noopener noreferrer">
            <img
              src={imageData.links && imageData.links.length > 0 ? imageData.links[0].href : ''}
              alt={imageData.data[0].title}
              style={{ width: '100%', maxHeight: '500px', objectFit: 'cover', cursor: 'pointer' }}
            />
          </a>
          
          <p>{imageData.data[0].description}</p>

          {/* Botón dibujar y anotar */}
          <Button variant="contained" color="primary" onClick={handleOpenModal}>
            Dibujar y Anotar
          </Button>

          {/* área de dibuj */}
          <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <Box sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
              borderRadius: '8px',
            }}>
              <Typography id="modal-title" variant="h6" sx={{ marginBottom: '10px' }}>
                Agregar Anotación y Dibujo
              </Typography>
              
              {/* Color pincel */}
              <FormControl fullWidth sx={{ marginBottom: '20px' }}>
                <InputLabel>Color del pincel</InputLabel>
                <input
                  type="color"
                  value={brushColor}
                  onChange={handleBrushColorChange}
                  style={{ width: '100%' }}
                />
              </FormControl>

              {/* C */}
              <ReactSketchCanvas
                width="100%"
                height={200}
                strokeColor={brushColor}
                strokeWidth={5}
                onChange={setDrawing}
                style={{ border: '1px solid #ddd' }}
              />

              {/* anotac */}
              <TextField
                label="Anotación"
                multiline
                fullWidth
                variant="outlined"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                onSelect={handleTextSelect}
                sx={{ marginTop: '10px' }}
              />

              {/* botones a editar negritas */}
              <Button onClick={handleBoldText} variant="contained" sx={{ marginTop: '10px' }}>
                {isBold ? "Desactivar Negritas" : "Aplicar Negritas"}
              </Button>

              <Button
                onClick={handleSaveDrawing}
                variant="contained"
                color="primary"
                sx={{ marginTop: '20px' }}
              >
                Guardar
              </Button>
            </Box>
          </Modal>
        </div>
      ) : (
        <p>No se encontró la imagen.</p>
      )}
    </div>
  );
};

export default Info;
