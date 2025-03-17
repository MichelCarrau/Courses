import React from 'react';
import { Typography, Box } from '@mui/material';

const Home = () => {
  return (
    <Box sx={{ textAlign: 'center', mt: 5 }}>
      <Typography variant="h3">Welcome to NASA Image and Video Library</Typography>
      <Typography variant="h5" sx={{ mt: 2 }}>
        Explore the wonders of the universe through NASA's extensive media collection.
      </Typography>
    </Box>
  );
};

export default Home;