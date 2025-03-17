import React, { useState, useEffect } from "react";
import { getNasaImages } from './nasaApi'; // Importa la función desde nasaApi.js

const NasaImageSearch = () => {
  const [images, setImages] = useState([]); // Estado para las imágenes
  const [loading, setLoading] = useState(true); // Estado para el cargando
  const [error, setError] = useState(null); // Estado para el error

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const fetchedImages = await getNasaImages();  // Aquí no necesitas pasar la clave API
        console.log(fetchedImages); // Para revisar la respuesta en la consola
        setImages(fetchedImages); // Guarda las imágenes en el estado
        setLoading(false); // Finaliza el estado de carga
      } catch (err) {
        setError("Error al obtener las imágenes: " + err.message); // Maneja el error
        setLoading(false);
      }
    };

    fetchImages(); // Ejecutamos la función cuando el componente se monte
  }, []); // Este effect solo se ejecuta una vez cuando el componente se monta

  return (
    <div>
      {loading && <p>Cargando imágenes...</p>} {/* Muestra el mensaje de carga */}
      {error && <p>{error}</p>} {/* Muestra el mensaje de error */}
      <div>
        {images.length > 0 ? (
          images.map((item, index) => (
            <div key={index}>
              <h3>{item.data[0].title}</h3> {/* Muestra el título de la imagen */}
              <p>{item.data[0].description}</p> {/* Muestra la descripción de la imagen */}
              {item.links && item.links.length > 0 && (
                <img src={item.links[0].href} alt={item.data[0].title} /> 
              )}
            </div>
          ))
        ) : (
          <p>No hay imágenes disponibles.</p>  
        )}
      </div>
    </div>
  );
};

export default NasaImageSearch;
