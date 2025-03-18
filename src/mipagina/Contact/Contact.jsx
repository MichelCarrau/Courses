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
      boxSizing: 'border-box',
      flexDirection: 'column',
      backgroundImage: 'url(https://www.wbs.ac.uk/sites/wbs2020/cache/file/6E097BF2-DC2A-C606-597DAB7236AD4F70.jpg)', 
      color: 'white',
      height: '650px'
    }}>
      <h1>Let's talk! 📩</h1>
      <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
        Do you have any suggestions to improve this page or want to contribute content?
        Your help is welcome! 🌟
      </p>
      <p style={{ fontSize: '18px', lineHeight: '1.6', fontWeight: 'bold' }}>
        Contact me on <span style={{ color: 'lightblue' }}>Instagram</span> and let's work together. ✨
      </p>
      <p style={{ fontSize: '20px', fontWeight: 'bold' }}>
        📸 <a href="https://www.instagram.com/lovelmich" target="_blank" rel="noopener noreferrer" 
          style={{ textDecoration: 'none', color: 'lightblue' }}>
          @lovelmich
        </a>  
      </p>
      <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
       I hope to hear from you soon! 💌  
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
          "Every idea matters, every suggestion adds. 💡🚀"
        </p>
      </div>
    </div>
  );
}

export default Contact;
