import React from 'react';
import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';



export default function Checkout() {
  const navigate = useNavigate();
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const total = carrito.reduce((sum, item) => sum + (item.Precio * item.cantidad), 0);
  
    useEffect(() => {
    const navbar = document.querySelector('.custom-navbar');
    if (navbar) {
      navbar.style.display = 'none';
    }
    
    return () => {
      if (navbar) {
        navbar.style.display = 'block';
      }
    };
  }, []);



  return (
    <Container className="my-5">
      <h1 className="mb-4">Verifica tu carrito</h1>
      
      <Row>
        <Col md={8}>
          <h4>Productos en tu carrito</h4>
          {carrito.map((producto) => (
            <Card key={producto.id} className="mb-3">
              <Card.Body>
                <Row className="align-items-center">
                  <Col xs={3}>
                    <img 
                      src={producto.ImagenURL} 
                      alt={producto.nombre}
                      style={{ width: '100%', height: '80px', objectFit: 'contain' }}
                    />
                  </Col>
                  <Col xs={6}>
                    <h6>{producto.nombre}</h6>
                    <p className="text-muted small mb-0">{producto.Descripcion}</p>
                    <small className="text-muted">Cantidad: {producto.cantidad}</small>
                  </Col>
                  <Col xs={3} className="text-end">
                    <strong>L. {producto.Precio * producto.cantidad}</strong>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </Col>
        
        <Col md={4} >
          <Card>
            <Card.Header>
              <h5 className="mb-0">Resumen</h5>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>Subtotal:</span>
                  <span>L. {total}</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>Envío:</span>
                  <span>L. 100.00</span>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>Total:</span>
                  <strong>L. {total + 100}</strong>
                </ListGroup.Item>
              </ListGroup>
              <Button variant="primary" className="w-100 mt-3">
                Confirmar Compra
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}