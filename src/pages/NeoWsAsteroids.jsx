import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid } from '@mui/material';

const NeoWsAsteroids = () => {
  const [asteroids, setAsteroids] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAsteroids = async () => {
      try {
        // Get the current date
        const currentDate = new Date();
        const startDate = currentDate.toISOString().split('T')[0];
        // Calculate the date 7 days later
        currentDate.setDate(currentDate.getDate() + 7);
        const endDate = currentDate.toISOString().split('T')[0];
        
        const apiKey = 'H2NiNFcT1vKsPLC2a1HD2nyoBG3igTf10j0ex5Os'; // Api key

        //rqeuest
        const response = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`);
        const data = await response.json();
        
        // si tieneasteroids
        if (data && data.near_earth_objects) {
          setAsteroids(data.near_earth_objects);
        } else {
          setError('No asteroids found for the selected dates');
        }
        
        setLoading(false);
      } catch (err) {
        setError('Error fetching the asteroids');
        setLoading(false);
      }
    };

    fetchAsteroids();
  }, []);

  if (loading) {
    return <p>Loading asteroids...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Get the nearest date
  const nearestDate = Object.keys(asteroids)[0];
  const nearestAsteroids = asteroids[nearestDate];

  return (
    <Box sx={{ 
      backgroundColor: '#0f0411', 
      padding: '20px', 
      borderRadius: '8px', 
      marginTop: '20px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
    }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold', color: '#fff' }}>
        NASA Asteroid Data
      </Typography>
      <Typography variant="h6" sx={{ mb: 3, color: '#fff' }}>
        Here you'll find the closest asteroids to Earth! 🌠
      </Typography>
      <Typography sx={{ color: '#fff', fontSize: '1rem', marginBottom: '20px' }}>
        The asteroids we are monitoring have trajectories that could bring them close to Earth in the coming days. Here you can explore details of each, such as their name, approach date, and more.
      </Typography>
      <Typography sx={{ color: '#fff', fontSize: '1rem', marginBottom: '20px' }}>
        Did you know that some of these asteroids come as close as tens of thousands of kilometers to us? Although most of them don't pose a threat, it's important to keep track of their movements. This information is key to astronomy and the protection of our planet.
      </Typography>
      <Typography sx={{ color: '#fff', fontSize: '1rem', marginBottom: '20px' }}>
        Below, we present the asteroids that will be closest to Earth in the next 7 days. Explore them to learn more!
      </Typography>

      {/* Nearest Day */}
      <Box 
        sx={{
          backgroundColor: '#b52915', 
          padding: '15px',
          borderRadius: '8px',
          color: '#fff',
          marginBottom: '20px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 2,
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            fontSize: '2rem',
            textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
            letterSpacing: '1px',
          }}
        >
          This is the nearest day! <br /> <br></br>
          <span
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.6)', 
              padding: '10px 20px',
              borderRadius: '10px',
              fontSize: '2rem',
              fontWeight: 'bold',
              color: '#fff',
            }}
          >
            {nearestDate}
          </span>
        </Typography>

        {nearestAsteroids.map((asteroid, index) => (
          <Box key={index} sx={{ marginBottom: '10px' }}>
            <strong>{asteroid.name}</strong> <br />
            ID: {asteroid.id} <br />
            Close Approach: {asteroid.close_approach_data[0].close_approach_date_full}
          </Box>
        ))}
      </Box>

      {/* Other Days */}
      <Typography variant="h5" sx={{ mb: 1, fontWeight: 'bold', color: 'white' }}>Other Days:</Typography>
      {Object.keys(asteroids).length === 0 ? (
        <p style={{ color: '#fff' }}>No asteroids found for the selected dates.</p>
      ) : (
        <Grid container spacing={2}>
          {Object.keys(asteroids).map((date, index) => {
            if (date === nearestDate) return null;
            return (
              <Grid item xs={6} md={3} key={index}>
                <Box 
                  sx={{
                    backgroundColor: '#2e1a47',
                    padding: '15px',
                    borderRadius: '8px',
                    color: '#fff',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 1 }}>{date}</Typography>
                  {asteroids[date].map((asteroid, index) => (
                    <Box key={index} sx={{ marginBottom: '10px' }}>
                      <strong>{asteroid.name}</strong> <br />
                      ID: {asteroid.id} <br />
                      Close Approach: {asteroid.close_approach_data[0].close_approach_date_full}
                    </Box>
                  ))}
                </Box>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
};

export default NeoWsAsteroids;
