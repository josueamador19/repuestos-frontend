// src/pages/NoticiaDetalle.jsx
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Form, Button } from "react-bootstrap";
import { getNoticiaById, getComentariosByNoticia, addComentario } from "../services/api";

export default function NoticiaDetalle() {
    const { id } = useParams();
    const [noticia, setNoticia] = useState(null);
    const [comentarios, setComentarios] = useState([]);
    const [nuevoComentario, setNuevoComentario] = useState("");
    const [loading, setLoading] = useState(true);
    const comentariosRef = useRef(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const noticiaData = await getNoticiaById(id);
                const comentariosData = await getComentariosByNoticia(id);
                setNoticia(noticiaData);
                setComentarios(comentariosData);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!nuevoComentario.trim()) return;
        try {
            // UsuarioID fijo = 1 y nombre = "Anónimo", Esto debe cambiarse despues cuando el LOGIN este terminado
            const comentario = await addComentario(id, 1, nuevoComentario, "Anónimo");

            setComentarios([...comentarios, comentario]);
            setNuevoComentario("");

            // Scroll al último comentario
            setTimeout(() => {
                if (comentariosRef.current) {
                    comentariosRef.current.scrollTop = comentariosRef.current.scrollHeight;
                }
            }, 100);
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <p>Cargando noticia...</p>;
    if (!noticia) return <p>Noticia no encontrada</p>;

    return (
        <Container className="mt-4 mb-5">
            <Card>
                {noticia.imagen_url && (
                    <Card.Img
                        variant="top"
                        src={`http://127.0.0.1:8000/static/images/${noticia.imagen_url}`}
                        style={{
                            width: "80%",
                            maxWidth: "400px",
                            margin: "20px auto",
                            display: "block"
                        }}
                    />
                )}
                <Card.Body>
                    <Card.Title>{noticia.titulo}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                        Por {noticia.autor || "Anónimo"} |{" "}
                        {new Date(noticia.fecha).toLocaleDateString("es-ES", {
                            year: "numeric",
                            month: "long",
                            day: "numeric"
                        })}
                    </Card.Subtitle>
                    <Card.Text>{noticia.contenido}</Card.Text>

                    <hr />
                    <h5>Comentarios</h5>
                    <div
                        ref={comentariosRef}
                        style={{ maxHeight: "300px", overflowY: "auto", marginBottom: "15px" }}
                    >
                        {comentarios.length === 0 && <p>No hay comentarios todavía.</p>}
                        {comentarios.map((c) => (
                            <div key={c.id} className="mb-2">
                                <strong>{c.autor || "Anónimo"}:</strong> {c.contenido}
                                <br />
                                <small className="text-muted">
                                    {new Date(c.fecha).toLocaleString("es-ES")}
                                </small>
                            </div>
                        ))}
                    </div>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="nuevoComentario">
                            <Form.Label>Agregar comentario</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={nuevoComentario}
                                onChange={(e) => setNuevoComentario(e.target.value)}
                            />
                        </Form.Group>
                        <Button type="submit" className="mt-2">
                            Enviar
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}
