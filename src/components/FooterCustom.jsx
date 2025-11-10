import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function FooterCustom() {
  return (
    <footer
      style={{
        background: 'linear-gradient(90deg, #0b1d2e 0%, #142c46 100%)', 
        color: '#ffffff',
        paddingTop: '2rem',
        paddingBottom: '2rem',
      }}
    >
      <Container>
        <Row className="align-items-center text-center text-md-start">
          <Col md={6} className="mb-3 mb-md-0">
            <h5 className="fw-bold">RepuestosExpress</h5>
            <p className="mb-1">"Tu vehículo en marcha, siempre con lo mejor"</p>
            <p className="mb-0">Todos los derechos reservados © 2025</p>
          </Col>

          <Col md={6} className="text-md-end">
            <div className="mb-3">
              <Link
                to="/faq"
                className="btn btn-outline-light btn-sm me-2"
                role="button"
              >
                FAQ
              </Link>
              <Link
                to="/politicas"
                className="btn btn-outline-light btn-sm"
                role="button"
              >
                Políticas
              </Link>
            </div>

            <p className="mb-1">Aplicación Web elaborada por:</p>
            <p className="mb-0">
              Idalia Cruz · Marian Osorio · Maria Mejía · Oscar Amador · Wilmer Morales
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
