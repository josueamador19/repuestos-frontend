import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function SeleccionLogin() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      navigate('/datos-envio');
    }
  }, [navigate]);

  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    return null;
  }

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow">
            <Card.Body className="p-5">
              <h2 className="text-center mb-4">¡Sea bienvenido!</h2>
              <p className="text-center text-muted mb-4">
                Elige como deseas continuar con tu compra
              </p>

              <Card className="mb-3 border-secondary">
                <Card.Body className="text-center">
                  <h5 style={{color: '#0e4a68ff'}}>Inicia sesión</h5>
                  <p className="text-muted small mb-3">
                    Accede a tu cuenta para una experiencia personalizada
                  </p>
                  <Button 
                    size="lg" 
                    className="w-100"
                    onClick={() => navigate('/login')}
                    style={{ backgroundColor: '#0c374eff', borderColor: '#022A3F'}}
                    onMouseEnter={(e)=>e.target.style.backgroundColor='#034a79ff'}
                    onMouseLeave={(e)=>e.target.style.backgroundColor='#022A3F'}>
                    Iniciar Sesión
                  </Button>
                  <div className="mt-2">
                    <small className="text-muted">
                      ¿No tienes cuenta?{' '}
                      <Button 
                        variant="link" 
                        className="p-0" 
                        onClick={() => navigate('/registro')}
                      >
                        Regístrate aquí
                      </Button>
                    </small>
                  </div>
                </Card.Body>
              </Card>

              <Card className="border-secondary">
                <Card.Body className="text-center">
                  <h5>Compra como invitado</h5>
                  <p className="text-muted small mb-3">
                    Completa tu pedido sin crear una cuenta
                  </p>
                  <Button 
                    size="lg" 
                    className="w-100"
                    onClick={() => navigate('/datos-envio')}
                    style={{ backgroundColor: '#D7C5A1', borderColor: '#ada38fff', color: 'black'}}
                    onMouseEnter={(e)=>e.target.style.backgroundColor='#ada38fff'}
                    onMouseLeave={(e)=>e.target.style.backgroundColor='#D7C5A1'}>
                    Continuar como invitado
                  </Button>
                </Card.Body>
              </Card>

              <div className="text-center mt-4">
                <Button 
                  variant="link" 
                  onClick={() => navigate('/checkout')}
                >
                  ← Volver al carrito
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}