import React, { useState, useEffect } from "react";
import { getNasaImages } from './nasaApi';
import { Card, CardContent, CardMedia, Typography, Grid, Select, MenuItem, FormControl, InputLabel, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 

const NasaImageSearch = () => {
  const [images, setImages] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate(); // Router p/ navegar a otras páginas

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const fetchedImages = await getNasaImages(); 
        setImages(fetchedImages); // Guarda img
        setLoading(false); // Finaliza
      } catch (err) {
        setError("Error al obtener las imágenes: " + err.message);
        setLoading(false);
      }
    };

    fetchImages(); 
  }, []); //Solo 1 vez

  // Categorias
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
              <Card sx={{ maxWidth: 400, width: '100%', boxShadow: 3, backgroundColor: '#b52915' , color: 'white'}}>
                <CardMedia
                  component="img"
                  height="300"
                  image={item.links && item.links.length > 0 ? item.links[0].href : ""}
                  alt={item.data[0].title}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" align="center">
                    {item.data[0].title}
                  </Typography>
                  <br></br>
                  <Typography variant="body2" color="white" align="center">
                    {item.data[0].description.substring(0, 100)}... {/* Resumen descr */}
                  </Typography>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(`/Info`, { state: { imageId: item.data[0].nasa_id } })}
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
