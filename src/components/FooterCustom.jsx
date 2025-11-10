import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
          <div className="mb-2">
              <Link to="/faq" className="btn btn-outline-light btn-sm me-2" role="button">
                FAQ
              </Link>
              <Link to="/politicas" className="btn btn-outline-light btn-sm" role="button">
                Políticas
              </Link>
            </div>
            <p>Aplicacion Web Elaborada por:</p>
            <p>Idalia Cruz</p>
            <p>Marian Osorio</p>
            <p>Maria Mejia</p>
            <p>Oscar Amador</p>
            <p>Wilmer Morales</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
