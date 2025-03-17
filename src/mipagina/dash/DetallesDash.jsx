import React from 'react';
import { useParams } from 'react-router-dom'; 

export default function DetallesDash() {
  let { id } = useParams();  


  return (
    <div>
      Soy componente detalles
      <br />
      <h2>ID obtenida desde URL: {id}</h2>  
    </div>
  );
}
