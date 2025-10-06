import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
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
            <h2 className="text-center mb-4">📰 Blog de Noticias</h2>
            {loading ? (
                <div className="text-center"><Spinner animation="border" /></div>
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
