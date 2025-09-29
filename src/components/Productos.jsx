// src/components/Productos.jsx
import React, { useEffect, useState } from 'react';
import { getProductos } from '../services/api';
import { Card, Button, Row, Col, Container } from 'react-bootstrap';

export default function Productos() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductos = async () => {
      const data = await getProductos();
      setProductos(data.productos || []);
    };
    fetchProductos();
  }, []);

  const imgStyle = {
    width: '100%',
    height: '200px',
    objectFit: 'contain', 
    backgroundColor: '#f0f0f0', 
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Nuestros Productos</h2>
      <Row>
        {productos.length > 0 ? (
          productos.map((producto) => (
            <Col key={producto.id} sm={12} md={6} lg={4} className="mb-4">
              <Card>
                <Card.Img
                  variant="top"
                  src={producto.ImagenURL || "https://via.placeholder.com/300x200?text=Sin+Imagen"}
                  alt={producto.nombre}
                  style={imgStyle}
                />
                <Card.Body>
                  <Card.Title>{producto.nombre}</Card.Title>
                  <Card.Text>
                    {producto.Descripcion} <br />
                    <strong>Precio:</strong> L.{producto.Precio} <br />
                    <strong>Disponibilidad:</strong> {producto.Stock > 0 ? producto.Stock : 'Agotado'} <br />
                    <strong>Categoría:</strong> {producto.Categoria}
                  </Card.Text>
                  <Button variant="primary" disabled={producto.Stock === 0}>
                    Comprar
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No hay productos disponibles.</p>
        )}
      </Row>
    </Container>
  );
}
