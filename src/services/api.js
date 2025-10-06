
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

export async function getNoticias() {
  const res = await fetch(`${API_URL}/blog`);
  return res.json();
}

export async function getNoticiaById(id) {
  const res = await fetch(`${API_URL}/blog/${id}`);
  return res.json();
}

export async function getComentariosByNoticia(id) {
  const res = await fetch(`${API_URL}/comentarios/${id}`);
  return res.json();
}

/**
 * Añadir comentario con UsuarioID fijo = 1 y autor = "Anónimo", aqui tambien debe de cambiarse eso cuando
 * el login este terminado
 */
export async function addComentario(noticiaId, usuarioId = 1, contenido, autor = "Anónimo") {
  const res = await fetch(`${API_URL}/comentarios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      noticia_id: noticiaId,
      usuario_id: usuarioId,
      contenido: contenido
    })
  });
  
  const data = await res.json();
  return { ...data, autor, contenido, id: data?.id || Date.now() };
}

export async function addNoticia(titulo, contenido, autor, imagen_url = null, categoria = null) {
  const res = await fetch(`${API_URL}/blog`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ titulo, contenido, autor, imagen_url, categoria })
  });
  return res.json();
}
