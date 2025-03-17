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
      boxSizing: 'border-box'
    }}>
      <div style={{ maxWidth: '600px' }}>
        <h1>Sobre esta página 🍰</h1>
        <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
          Bienvenid@ a este recetario. Soy <span style={{ color: 'tomato'}}>Mich</span>, aquí encontrarás recetas deliciosas 
          para sorprender a tu paladar y experimentar en la cocina. 
        </p>
        <p style={{ fontSize: '18px', lineHeight: '1.6', fontWeight: 'bold' }}>
          Recuerda: el primer paso es atreverse a probar algo nuevo. 🌟✨
        </p>
        <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
          ¿Tienes una receta única y especial? ¡Compártela! Contáctame en el apartado  
          <strong> "CONTACTANOS" </strong> y hagamos magia juntos. 🍽️💖  
        </p>
        <p style={{ fontSize: '22px', fontWeight: 'bold', color: 'tomato' }}>¡Bon appétit! 😋</p>
      </div>
    </div>
  );
}

export default About;
