import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NoticiaCard from '../components/Blog/NoticiaCard';
import { getNoticias } from '../services/api';

export default function Blog() {
    const [noticias, setNoticias] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getNoticias()
            .then((data) => setNoticias(data || []))
            .finally(() => setLoading(false));
    }, []);

    return (
        <Container className="mt-4 mb-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="m-0">Blog de Noticias</h2>

                
                <Link to="/blog/nueva">
                    <Button variant="success">
                        Crear Noticia
                    </Button>
                </Link>
            </div>

            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" />
                </div>
            ) : (
                <Row>
                    {noticias.length > 0 ? (
                        noticias.map((noticia) => (
                            <Col key={noticia.id} md={4} className="mb-4">
                                <NoticiaCard noticia={noticia} />
                            </Col>
                        ))
                    ) : (
                        <p className="text-center">No hay noticias disponibles.</p>
                    )}
                </Row>
            )}
        </Container>
    );
}
