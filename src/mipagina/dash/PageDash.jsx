import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material'; 

export default function PageDash() {
  return (
    <div>
      Soy dash
      <br />
      <Link to="/dash/23">Click para más detalles de México</Link>
      <br />
      <Link to="/dash/43">Click para más detalles de USA</Link>
      <br />
      <Link to="/dash/32">Click para más detalles de Honduras</Link>
      <br />
      
      <Button component={Link} to="/dash/45" variant="contained" color="success">
        Ver más detalles Irak
      </Button>
    </div>
  );
}
