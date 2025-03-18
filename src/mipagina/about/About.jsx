import React from 'react';

function About() {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '80vh', 
      textAlign: 'center',
      padding: '20px',
      boxSizing: 'border-box',
      flexDirection: 'column',
      backgroundImage: 'url(https://www.wbs.ac.uk/sites/wbs2020/cache/file/6E097BF2-DC2A-C606-597DAB7236AD4F70.jpg)', 
      color: 'white'
    }}>
      <h1>Sobre esta página 🚀</h1>
      <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
        Bienvenid@ al espacio visual de la NASA. Soy <span style={{ color: 'lightblue' }}>Mich</span>, y creé este rincón 
        para compartir imágenes impresionantes del cosmos. 🌌✨
      </p>
      <p style={{ fontSize: '18px', lineHeight: '1.6', fontWeight: 'bold' }}>
        Recuerda: el universo está lleno de maravillas, solo hay que saber dónde mirar. 🔭🌠
      </p>
      <p style={{ fontSize: '18px', lineHeight: '1.6' }}>

      </p>
      <div style={{ 
        width: '100%', 
        maxWidth: '600px', 
        height: '300px', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        borderRadius: '15px',
        margin: '20px 0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <p style={{
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          padding: '10px 20px',
          borderRadius: '10px',
          fontSize: '20px',
          fontWeight: 'bold'
        }}>
          "El universo es infinito, y nuestras ganas de explorarlo también." 🚀✨
        </p>
      </div>
      <p style={{ fontSize: '30px', fontWeight: 'bold', color: 'lightblue' }}>¡Disfruta el viaje! 🌌</p>
    </div>
  );
}

export default About;
