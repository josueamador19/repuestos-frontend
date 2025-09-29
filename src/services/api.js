// src/services/api.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

export const getProductos = async () => {
  try {
    const response = await axios.get(`${API_URL}/productos`); 
    return response.data;
  } catch (error) {
    console.error('Error al obtener productos:', error);
    return [];
  }
};
