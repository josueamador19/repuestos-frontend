import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { addComentario } from '../../services/blogService';

export default function FormComentario({ noticiaId, onCommentAdded }) {
    const [autor, setAutor] = useState('');
    const [comentario, setComentario] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addComentario(noticiaId, autor, comentario);
        setAutor('');
        setComentario('');
        onCommentAdded();
    };

    return (
        <Form onSubmit={handleSubmit} className="mt-3">
            <Form.Group className="mb-2">
                <Form.Label>Tu nombre</Form.Label>
                <Form.Control
                    value={autor}
                    onChange={(e) => setAutor(e.target.value)}
                    required
                />
            </Form.Group>
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
            <Button type="submit" variant="success">Agregar comentario</Button>
        </Form>
    );
}
