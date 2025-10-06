import React from 'react';
import { Card } from 'react-bootstrap';

export default function ComentarioCard({ comentario }) {
    return (
        <Card className="mb-2 shadow-sm">
            <Card.Body>
                <strong>{comentario.Autor}</strong> <span className="text-muted">({new Date(comentario.FechaComentario).toLocaleDateString()})</span>
                <p className="mt-2">{comentario.Comentario}</p>
            </Card.Body>
        </Card>
    );
}
