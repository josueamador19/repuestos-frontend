import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Spinner } from 'react-bootstrap';
import { getNoticiaById, getComentariosByNoticia } from '../../services/blogService';
import ComentarioCard from './ComentarioCard';
import FormComentario from './FormComentario';

export default function NoticiaDetalle() {
    const { id } = useParams();
    const [noticia, setNoticia] = useState(null);
    const [comentarios, setComentarios] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const noticiaData = await getNoticiaById(id);
            const comentariosData = await getComentariosByNoticia(id);
            setNoticia(noticiaData);
            setComentarios(comentariosData);
            setLoading(false);
        }
        fetchData();
    }, [id]);

    if (loading) return <div className="text-center"><Spinner animation="border" /></div>;

    return (
        <Container className="mt-4 mb-5">
            <Card className="shadow-sm mb-4">
                <Card.Body>
                    <h2>{noticia.Titulo}</h2>
                    <p className="text-muted">
                        Publicado por {noticia.Autor} ({noticia.TipoUsuario}) — {new Date(noticia.FechaPublicacion).toLocaleDateString()}
                    </p>
                    <p>{noticia.Contenido}</p>
                </Card.Body>
            </Card>

            <h4>Comentarios</h4>
            {comentarios.map((comentario) => (
                <ComentarioCard key={comentario.ComentarioID} comentario={comentario} />
            ))}

            <FormComentario noticiaId={id} onCommentAdded={() => getComentariosByNoticia(id).then(setComentarios)} />
        </Container>
    );
}
