import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';

const NasaImageDetails = () => {
  const { nasaId } = useParams(); // Obtenemos ID de la imagen
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImageDetails = async () => {
      try {
        const response = await axios.get(`https://images-api.nasa.gov/asset/${nasaId}`);
        const data = response.data.collection.items;
        
        if (data && data.length > 0) {
          setImageData(data[0]); // 'data[0]' es objeto c la imagen
        } else {
          setError('No se encontraron detalles de la imagen.');
        }
      } catch (err) {
        setError('Hubo un error al obtener los detalles de la imagen.');
      } finally {
        setLoading(false);
      }
    };

    fetchImageDetails();
  }, [nasaId]); // Ejecutar c cambia el 'nasaId'

  if (loading) {
    return (
      <Box sx={{ py: 3, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Cargando detalles de la imagen...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ py: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 3 }}>
      {imageData && (
        <div>
          <Typography variant="h4" align="center" gutterBottom>
            {imageData.data[0].title}
          </Typography>
          {imageData.links && imageData.links.length > 0 && (
            <img
              src={imageData.links[0].href}
              alt={imageData.data[0].title}
              style={{ width: '100%', maxHeight: '500px', objectFit: 'contain' }}
            />
          )}
          <Typography variant="body1" align="center" sx={{ mt: 2 }}>
            {imageData.data[0].description}
          </Typography>
        </div>
      )}
    </Box>
  );
};

export default NasaImageDetails;
