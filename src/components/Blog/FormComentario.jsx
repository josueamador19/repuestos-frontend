import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { addComentario } from '../../services/blogService';
import { useNavigate } from 'react-router-dom';

export default function FormComentario({ noticiaId, onCommentAdded }) {
  const [usuario, setUsuario] = useState(null); // usuario cargado
  const [comentario, setComentario] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/login'); // redirige si no hay usuario
      return;
    }
    setUsuario(user);
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!usuario) return; // seguridad adicional

    try {
      await addComentario(noticiaId, usuario.id, comentario); // enviamos el id del usuario
      setComentario('');
      onCommentAdded();
    } catch (err) {
      console.error('Error al agregar comentario:', err);
      alert('No se pudo enviar el comentario');
    }
  };

  if (!usuario) {
    return <p>Cargando usuario...</p>;
  }

  return (
    <Form onSubmit={handleSubmit} className="mt-3">
      <Form.Group className="mb-2">
        <Form.Label>Comentario</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          required
        />
      </Form.Group>
      <Button type="submit" variant="success">
        Agregar comentario como {usuario.nombre || usuario.username}
      </Button>
    </Form>
  );
}
