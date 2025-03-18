import React, { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import NeoWsAsteroids from './NeoWsAsteroids';

const NasaImageOfTheDay = () => {
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNasaImage = async () => {
      try {
        const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=H2NiNFcT1vKsPLC2a1HD2nyoBG3igTf10j0ex5Os');
        const data = await response.json();
        setImageData(data); // Guarda
        setLoading(false);
      } catch (err) {
        setError('Error al obtener la imagen de la NASA');
        setLoading(false);
      }
    };

    fetchNasaImage();
  }, []);

  if (loading) {
    return <p>Loading NASA image...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Box sx={{ 
      backgroundColor: '#0f0411', 
      padding: '20px', 
      borderRadius: '8px', 
      marginTop: '20px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
    }}>
      {/* Imagen de la NASA */}
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold', color: '#fff' }}>
      NASA IMAGE OF THE DAY
      </Typography>
      
      <Typography variant="h6" sx={{ color: '#fff' }}>{imageData.title}</Typography>
      <Typography sx={{ color: '#fff' }}>{imageData.explanation}</Typography>
      <img
        src={imageData.url}
        alt={imageData.title}
        style={{ width: '100%', maxHeight: '500px', objectFit: 'cover', marginTop: '10px' }}
      />
    </Box>
  );
};

const Home = () => {
  return (
    <Box
  sx={{
    textAlign: 'center',
    mt: 5,
    p: 4,
    borderRadius: '12px',
    color: '#fff',
    backgroundColor: '#0b3d92',
  }}
>
  <Typography
    variant="h3"
    sx={{
      fontWeight: 'bold',
      textShadow: '3px 3px 10px rgba(255, 255, 255, 0.7)',
    }}
  >
    🌌Here you will find incredible images from NASA!🌌 ^-^
  </Typography>
  
  <Typography
    variant="h5"
    sx={{
      mt: 2,
      fontStyle: 'italic',
      textShadow: '2px 2px 8px rgba(255, 255, 255, 0.5)',
    }}
  >
    Explore the wonders of the universe through NASA's extensive media collection.
  </Typography>


  <NasaImageOfTheDay />

  <Typography variant="h3" sx={{ mt: 5, fontWeight: 'bold', color: '#fff' }}>
        🚀 Asteroids Data from NASA 🚀
      </Typography>

      <NeoWsAsteroids /> 
</Box>

  );
};

export default Home;
