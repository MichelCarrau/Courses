import React from 'react';

function About() {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      textAlign: 'center',
      padding: '20px',
      boxSizing: 'border-box',
      flexDirection: 'column',
      backgroundImage: 'url(https://www.wbs.ac.uk/sites/wbs2020/cache/file/6E097BF2-DC2A-C606-597DAB7236AD4F70.jpg)', 
      color: 'white',
      height: '650px'
    }}>
      <h1>About this page 🚀</h1>
      <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
        Welcome to NASA's visual space. I'm <span style={{ color: 'lightblue' }}>Mich</span>, and I created this corner 
        to share stunning images of the cosmos. 🌌✨
      </p>
      <p style={{ fontSize: '18px', lineHeight: '1.6', fontWeight: 'bold' }}>
        Remember: the universe is full of wonders, you just have to know where to look. 🔭🌠
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
          "The universe is infinite, and our desire to explore it is too." 🚀✨
        </p>
      </div>
      <p style={{ fontSize: '30px', fontWeight: 'bold', color: 'lightblue' }}>Enjoy the journey! 🌌</p>
    </div>
  );
}

export default About;
