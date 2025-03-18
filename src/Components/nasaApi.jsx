import axios from 'axios';

export const getNasaImages = async (apiKey) => {
  const queries = ['sun', 'earth', 'asteroid', 'nebula', 'comet', 'satellite', 'blackhole', 'spacecraft', 'planet', 'star'];  // Palabras clave adicionales
  let allImages = [];

  for (const query of queries) {
    const url = `https://images-api.nasa.gov/search?q=${query}&media_type=image`;  // Realizamos la búsqueda por cada término
    try {
      const response = await axios.get(url);
      allImages = [...allImages, ...response.data.collection.items];  // Agregamos las imágenes de cada búsqueda
    } catch (error) {
      console.error('Error al obtener las imágenes para', query, error.message);
    }
  }

  console.log(allImages);  // Ver los resultados combinados
  return allImages;  // Devuelve las imágenes combinadas
};
