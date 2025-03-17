import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Box sx={{ textAlign: 'center', mt: 5 }}>
      <Typography variant="h4">
      ❤️ ¿Qué te apetece comer? ❤️
      </Typography>
        <br></br>
      <Typography variant="h5" color="tomato">
      ¡Ingresa para conocer la receta de tu preferencia! ^-^
      </Typography>
      
      <Link to="/Birds" style={{ textDecoration: 'none' }}>
        <Button variant="contained" size="large" color="primary" sx={{ mt: 2 }}>
          Recetas deliciosas💌
        </Button>
      </Link>
    </Box>
  );
};

export default Home;