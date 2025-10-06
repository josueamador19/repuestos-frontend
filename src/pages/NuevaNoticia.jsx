import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { addNoticia } from '../services/api';

export default function NuevaNoticia() {
    const [titulo, setTitulo] = useState('');
    const [autor, setAutor] = useState('');
    const [contenido, setContenido] = useState('');
    const [tipoUsuario, setTipoUsuario] = useState('Comprador');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addNoticia({ titulo, autor, contenido, tipoUsuario });
        alert('Noticia publicada correctamente');
        setTitulo('');
        setAutor('');
        setContenido('');
    };

    return (
        <Container className="mt-5 mb-5">
            <h2>📝 Publicar Nueva Noticia</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Título</Form.Label>
                    <Form.Control value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Autor</Form.Label>
                    <Form.Control value={autor} onChange={(e) => setAutor(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Contenido</Form.Label>
                    <Form.Control as="textarea" rows={5} value={contenido} onChange={(e) => setContenido(e.target.value)} required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Tipo de Usuario</Form.Label>
                    <Form.Select value={tipoUsuario} onChange={(e) => setTipoUsuario(e.target.value)}>
                        <option value="Comprador">Comprador</option>
                        <option value="Vendedor">Vendedor</option>
                    </Form.Select>
                </Form.Group>

                <Button type="submit" variant="primary">Publicar</Button>
            </Form>
        </Container>
    );
}
