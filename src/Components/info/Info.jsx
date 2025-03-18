import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getNasaImages } from '../nasaApi'; // Asegúrate de tener esta función
import { Button, Modal, Box, TextField, Typography, InputLabel, FormControl } from '@mui/material';
import CanvasDraw from 'react-canvas-draw'; // Para el área de dibujo

const Info = () => {
  const location = useLocation();
  const imageId = location.state?.imageId; // Obtenemos el ID de la imagen desde la ruta
  
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false); // Control del modal
  const [note, setNote] = useState(""); // Nota que el usuario escribe
  const [drawing, setDrawing] = useState(null); // Objeto del dibujo
  const [brushColor, setBrushColor] = useState("#000000"); // Color del pincel (por defecto negro)
  const [isBold, setIsBold] = useState(false); // Formato de texto en negrita
  const [selectedText, setSelectedText] = useState(""); // Texto seleccionado para aplicar formato

  useEffect(() => {
    const fetchImageData = async () => {
      try {
        const fetchedImages = await getNasaImages();
        const image = fetchedImages.find(item => item.data[0].nasa_id === imageId); // Buscamos la imagen por ID
        setImageData(image);
        setLoading(false);
      } catch (err) {
        setError("Error al obtener los detalles de la imagen: " + err.message);
        setLoading(false);
      }
    };

    fetchImageData();
  }, [imageId]); // Re-fetch si el ID cambia

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // Función para guardar el dibujo y la anotación en archivos
  const handleSaveDrawing = () => {
    const imageUrl = drawing.getDataURL(); // Obtiene la URL de la imagen en base64
    const imageBlob = dataURLtoBlob(imageUrl); // Convierte la imagen base64 a un blob
    const imageFile = new Blob([imageBlob], { type: 'image/png' });

    // Crear archivo de texto con la anotación
    const textFile = new Blob([note], { type: 'text/plain' });

    // Crear enlaces de descarga
    const imageDownloadUrl = URL.createObjectURL(imageFile);
    const textDownloadUrl = URL.createObjectURL(textFile);

    // Crear enlaces y simular el clic para descargar
    const imageLink = document.createElement('a');
    imageLink.href = imageDownloadUrl;
    imageLink.download = 'dibujo.png'; // Nombre del archivo de la imagen
    imageLink.click();

    const textLink = document.createElement('a');
    textLink.href = textDownloadUrl;
    textLink.download = 'anotacion.txt'; // Nombre del archivo de la anotación
    textLink.click();

    setOpenModal(false); // Cerrar el modal después de guardar
  };

  // Función para convertir base64 a Blob (para la imagen)
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

  // Cambiar el color del pincel
  const handleBrushColorChange = (event) => {
    setBrushColor(event.target.value);
  };

  // Cambiar el estilo del texto (negritas)
  const handleBoldText = () => {
    if (selectedText) {
      setNote(note.replace(selectedText, `<b>${selectedText}</b>`)); // Aplicar negritas al texto seleccionado
      setSelectedText(""); // Resetear el texto seleccionado
    } else {
      setIsBold(!isBold);
    }
  };

  const handleTextSelect = (event) => {
    const text = window.getSelection().toString(); // Obtener el texto seleccionado
    setSelectedText(text); // Guardar el texto seleccionado
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
          
          {/* Imagen clicable que te lleva a la URL */}
          <a href={imageData.links && imageData.links.length > 0 ? imageData.links[0].href : '#'} target="_blank" rel="noopener noreferrer">
            <img
              src={imageData.links && imageData.links.length > 0 ? imageData.links[0].href : ''}
              alt={imageData.data[0].title}
              style={{ width: '100%', maxHeight: '500px', objectFit: 'cover', cursor: 'pointer' }}
            />
          </a>
          
          <p>{imageData.data[0].description}</p>

          {/* Botón para abrir el modal */}
          <Button variant="contained" color="primary" onClick={handleOpenModal}>
            Dibujar y Anotar
          </Button>

          {/* Modal para el área de dibujo y anotación */}
          <Modal open={openModal} onClose={handleCloseModal}>
            <Box sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 600,
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
            }}>
              <Typography variant="h6" sx={{ marginBottom: '10px' }}>
                Agregar Anotación y Dibujo
              </Typography>
              
              {/* Selector de color para el pincel */}
              <FormControl fullWidth sx={{ marginBottom: '20px' }}>
                <InputLabel>Color del pincel</InputLabel>
                <input
                  type="color"
                  value={brushColor}
                  onChange={handleBrushColorChange}
                  style={{ width: '100%' }}
                />
              </FormControl>
              
              {/* Área de dibujo */}
              <CanvasDraw 
                ref={(canvasDraw) => setDrawing(canvasDraw)} 
                brushColor={brushColor}
                brushRadius={2}
                lazyRadius={0}
                style={{ border: '1px solid black', marginBottom: '20px', width: '100%' }}
              />
              {/* Campo de anotación con posibilidad de seleccionar texto */}
              <TextField
                label="Añadir anotación"
                multiline
                fullWidth
                rows={4}
                variant="outlined"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                onMouseUp={handleTextSelect} // Detectar cuando el usuario selecciona texto
                sx={{ marginBottom: '20px' }}
              />
              <div>
                {/* Botón para hacer el texto en negritas */}
                <Button variant="outlined" onClick={handleBoldText} sx={{ marginRight: '10px' }}>
                  {selectedText ? "Aplicar Negritas" : (isBold ? "Quitar Negritas" : "Negritas")}
                </Button>
                {/* Botón para guardar */}
                <Button variant="contained" color="secondary" onClick={handleSaveDrawing} sx={{ marginRight: '10px' }}>
                  Guardar
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleCloseModal}>
                  Cerrar
                </Button>
              </div>
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
