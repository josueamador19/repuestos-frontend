import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';


export default function NoticiaCard({ noticia }) {
    const navigate= useNavigate();
    return (
        <Card className="h-100">
            {noticia.imagen_url && (
                <Card.Img
                    variant="top"
                    src={noticia.imagen_url ? `http://127.0.0.1:8000/static/images/${noticia.imagen_url}` : '/static/images/placeholder.jpg'}
                    alt={noticia.titulo}
                    style={{ objectFit: 'cover', height: '200px' }}
                />
            )}
            <Card.Body>
                <Card.Title>{noticia.titulo || "Sin título"}</Card.Title>
                <Card.Text>
                    {noticia.contenido ? noticia.contenido.slice(0, 100) + '...' : "Sin contenido"}
                </Card.Text>
                <p className="text-muted small">
                    Autor: {noticia.autor || "Desconocido"} <br />
                    Fecha: {noticia.fecha ? new Date(noticia.fecha).toLocaleDateString() : "Desconocida"}
                </p>
                <Button variant="primary" onClick={() => navigate(`/blog/noticia/${noticia.id}`)}>Leer más</Button>
            </Card.Body>
        </Card>
    );
}
