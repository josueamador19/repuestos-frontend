import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export default function FooterCustom() {
  return (
    <footer className="bg-dark text-light py-4">
      <Container>
        <Row>
          <Col md={6}>
            <h5>Repuestos</h5>
            <p>Todos los derechos reservados © 2025</p>
          </Col>
          <Col md={6} className="text-md-end">
            <p>Contacto: info@repuestos.com</p>
            <p>Tel: 9999-1111</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
