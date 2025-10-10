// src/pages/NuevaNoticia.jsx
import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { addNoticia } from '../services/api';

export default function NuevaNoticia() {
    const [titulo, setTitulo] = useState('');
    const [contenido, setContenido] = useState('');
    const [categoria, setCategoria] = useState('');
    const [imagen, setImagen] = useState(null);
    const [mensaje, setMensaje] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addNoticia(titulo, contenido, 1, categoria, imagen);
            setMensaje("Noticia creada correctamente");
            setTitulo('');
            setContenido('');
            setCategoria('');
            setImagen(null);

            
            setTimeout(() => {
                navigate("/blog");
            }, 1500);
        } catch (err) {
            setMensaje("Error al crear la noticia");
            console.error(err);
        }
    };

    return (
        <Container className="mt-5 mb-5">
            <h2>Publicar Nueva Noticia</h2>

            {mensaje && <Alert variant={mensaje.includes('✅') ? 'success' : 'danger'}>{mensaje}</Alert>}

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Título</Form.Label>
                    <Form.Control 
                        value={titulo} 
                        onChange={(e) => setTitulo(e.target.value)} 
                        required 
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Contenido</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows={5} 
                        value={contenido} 
                        onChange={(e) => setContenido(e.target.value)} 
                        required 
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Categoría</Form.Label>
                    <Form.Control 
                        value={categoria} 
                        onChange={(e) => setCategoria(e.target.value)} 
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Imagen</Form.Label>
                    <Form.Control 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => setImagen(e.target.files[0])} 
                    />
                </Form.Group>

                <Button type="submit" variant="primary">Publicar</Button>
            </Form>
        </Container>
    );
}
