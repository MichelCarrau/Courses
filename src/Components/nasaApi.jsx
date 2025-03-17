import axios from 'axios';

export const getNasaImages = async (apiKey) => {
  const url = `https://images-api.nasa.gov/search?q=moon&media_type=image`;  // Aquí puedes cambiar "moon" por cualquier otra palabra clave
  try {
    const response = await axios.get(url);
    console.log(response.data.collection.items);  // Asegúrate de revisar los datos aquí
    return response.data.collection.items;  // Devolvemos la lista de elementos
  } catch (error) {
    throw new Error('Error al obtener las imágenes: ' + error.message);
  }
};
