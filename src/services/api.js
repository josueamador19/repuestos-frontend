
import axios from 'axios';


export const backendUrl = import.meta.env.VITE_API_URL
export const imagenUrl = `${backendUrl}/static/images/`
 
console.log("API URL usada:", backendUrl);

export const getProductos = async () => {
  try {
    const response = await axios.get(`${backendUrl}/productos`); 
    return response.data;
  } catch (error) {
    console.error('Error al obtener productos:', error);
    return [];
  }
};

export async function getNoticias() {
  const res = await fetch(`${backendUrl}/blog`);
  return res.json();
}

export async function getNoticiaById(id) {
  const res = await fetch(`${backendUrl}/blog/${id}`);
  return res.json();
}

export async function getComentariosByNoticia(id) {
  const res = await fetch(`${backendUrl}/comentarios/${id}`);
  return res.json();
}

/**
 * Añadir comentario con UsuarioID fijo = 1 y autor = "Anónimo", aqui tambien debe de cambiarse eso cuando
 * el login este terminado
 */
export async function addComentario(noticiaId, usuarioId , contenido, autor = "Anónimo") {
  const res = await fetch(`${backendUrl}/comentarios`, {
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

// Crear Noticia
export async function addNoticia(titulo, contenido, autorId = 1, categoria = "", imagenFile = null) {
    try {
        const formData = new FormData();
        formData.append("titulo", titulo);
        formData.append("contenido", contenido);
        formData.append("AutorID", autorId);
        formData.append("categoria", categoria);
        if (imagenFile) {
            formData.append("imagen", imagenFile);
        }

        const response = await axios.post(`${backendUrl}/blog/`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });

        return response.data;
    } catch (error) {
        console.error("Error al crear noticia:", error);
        throw error;
    }
}


// =========================
// FAQ (Preguntas Frecuentes)
// =========================
export const getFaq = async () => {
  try {
    const response = await axios.get(`${backendUrl}/faq`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener preguntas frecuentes:', error);
    return [];
  }
};

export const addFaq = async (pregunta, respuesta, categoria = "") => {
  try {
    const response = await axios.post(`${backendUrl}/faq`, {
      pregunta,
      respuesta,
      categoria,
    });
    return response.data;
  } catch (error) {
    console.error('Error al agregar pregunta frecuente:', error);
    throw error;
  }
};

// =========================
// POLÍTICAS
// =========================
export const getPoliticas = async () => {
  try {
    const response = await axios.get(`${backendUrl}/politicas`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener políticas:', error);
    return [];
  }
};

export const addPolitica = async (tipo, titulo, contenido) => {
  try {
    const response = await axios.post(`${backendUrl}/politicas`, {
      tipo,
      titulo,
      contenido,
    });
    return response.data;
  } catch (error) {
    console.error('Error al agregar política:', error);
    throw error;
  }
};
