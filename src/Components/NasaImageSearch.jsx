import React, { useState, useEffect } from "react";
import { getNasaImages } from './nasaApi'; // Importa la función desde nasaApi.js
import { Card, CardContent, CardMedia, Typography, Grid, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material'; // Material-UI Components
import { useNavigate } from 'react-router-dom'; // Importar useNavigate para redirigir a /info

const NasaImageSearch = () => {
  const [images, setImages] = useState([]); // Estado para las imágenes
  const [loading, setLoading] = useState(true); // Estado para el cargando
  const [error, setError] = useState(null); // Estado para el error
  const [selectedCategory, setSelectedCategory] = useState(''); // Estado para la categoría seleccionada
  const navigate = useNavigate(); // Hook de React Router para navegar a otras páginas

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const fetchedImages = await getNasaImages();  // Aquí no necesitas pasar la clave API
        setImages(fetchedImages); // Guarda las imágenes en el estado
        setLoading(false); // Finaliza el estado de carga
      } catch (err) {
        setError("Error al obtener las imágenes: " + err.message); // Maneja el error
        setLoading(false);
      }
    };

    fetchImages(); // Ejecutamos la función cuando el componente se monte
  }, []); // Este effect solo se ejecuta una vez cuando el componente se monta

  // Filtrar las imágenes según el título o alguna palabra clave
  const filteredImages = selectedCategory
    ? images.filter((item) => item.data[0].title.toLowerCase().includes(selectedCategory.toLowerCase()))
    : images;

  return (
    <div style={{ padding: '20px' }}>
      <FormControl fullWidth style={{ marginBottom: '20px' }}>
        <InputLabel id="category-select-label">Selecciona una Categoría</InputLabel>
        <Select
          labelId="category-select-label"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          label="Selecciona una Categoría"
        >
          <MenuItem value="">Todas</MenuItem>
          <MenuItem value="sun">Sol</MenuItem>
          <MenuItem value="earth">Tierra</MenuItem>
          <MenuItem value="asteroid">Asteroides</MenuItem>
          <MenuItem value="nebula">Nebulosas</MenuItem>
          <MenuItem value="comet">Cometas</MenuItem>
          <MenuItem value="satellite">Satélites</MenuItem>
          <MenuItem value="blackhole">Agujeros Negros</MenuItem>
          <MenuItem value="spacecraft">Naves Espaciales</MenuItem>
          <MenuItem value="planet">Planetas</MenuItem>
          <MenuItem value="star">Estrellas</MenuItem>
        </Select>
      </FormControl>

      {loading && <p>Cargando imágenes...</p>}
      {error && <p>{error}</p>}

      <Grid container spacing={4} justifyContent="center">
        {filteredImages.length > 0 ? (
          filteredImages.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} style={{ display: 'flex', justifyContent: 'center' }}>
              <Card sx={{ maxWidth: 400, width: '100%', boxShadow: 3, backgroundColor: '#fc3d21' }}>
                <CardMedia
                  component="img"
                  height="300"
                  image={item.links && item.links.length > 0 ? item.links[0].href : ""}
                  alt={item.data[0].title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div" align="center">
                    {item.data[0].title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" align="center">
                    {item.data[0].description.substring(0, 100)}... {/* Resumen de la descripción */}
                  </Typography>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(`/info`, { state: { imageId: item.data[0].nasa_id } })}
                  >
                    Ver más
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <p>No hay imágenes disponibles.</p>
        )}
      </Grid>
    </div>
  );
};

export default NasaImageSearch;
