import React from 'react';

function Contact() {
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
        <h1>¡Hablemos! 📩</h1>
        <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
          ¿Tienes una pregunta, una receta increíble o simplemente quieres saludar?  
          ¡Estoy aquí para leerte y compartir contigo! 🌟
        </p>
        <p style={{ fontSize: '18px', lineHeight: '1.6', fontWeight: 'bold' }}>
          Encuéntrame en <span style={{ color: '#E1306C' }}>Instagram</span> y mandemos recetas, memes y buena vibra. 😎✨
        </p>
        <p style={{ fontSize: '20px', fontWeight: 'bold' }}>
          📸 <a href="https://www.instagram.com/lovelmich" target="_blank" rel="noopener noreferrer" 
            style={{ textDecoration: 'none', color: '#E1306C' }}>
            @lovelmich
          </a>  
        </p>
        <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
          También puedes enviarme un mensaje directo aquí. ¡Estoy emocionad@ de leerte! 💌  
        </p>
      </div>
    </div>
  );
}

export default Contact;
