import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Alert, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { imagenUrl } from '../services/api';

export default function Checkout() {
  const navigate = useNavigate();
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const total = carrito.reduce((sum, item) => sum + (item.Precio * item.cantidad), 0);

  if (carrito.length === 0) {
    return (
      <Container className="my-5">
        <Alert variant="warning" className="text-center">
          <h4>Tu carrito está vacío</h4>
          <p>No hay productos para mostrar en el checkout.</p>
          <Button variant="primary" onClick={() => navigate('/productos')}>
            Ir a Productos
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <>

      <Container className="my-5">
        <h1 className="mb-4">Verifica tu carrito</h1>

        <Row className="mb-4">
          <Col className="text-center">
            <div className="d-flex justify-content-center align-items-center flex-wrap">
              <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-2"
                style={{ width: '35px', height: '35px' }}>
                1
              </div>
              <div className="mx-1 small">Verifica tu carrito</div>

              <div className="bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center mx-2"
                style={{ width: '35px', height: '35px' }}>
                2
              </div>
              <div className="mx-1 small">Inicia sesión</div>

              <div className="bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center mx-2"
                style={{ width: '35px', height: '35px' }}>
                3
              </div>
              <div className="mx-1 small">Datos de envío y pago</div>

              <div className="bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center mx-2"
                style={{ width: '35px', height: '35px' }}>
                4
              </div>
              <div className="mx-1 small">Pedido confirmado</div>
            </div>
          </Col>
        </Row>

        <hr className="mb-4" />

        <Row>
          <Col md={8}>
            <h4>Producto</h4>
            <Table responsive>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {carrito.map((producto) => (
                  <tr key={producto.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          src={producto.ImagenURL
                            ? imagenUrl + producto.ImagenURL
                            : "https://via.placeholder.com/150"}
                          alt={producto.nombre}
                          style={{ width: '60px', height: '60px', objectFit: 'contain', marginRight: '15px' }}
                        />
                        <div>
                          <strong>{producto.nombre}</strong>
                          {producto.Descripcion && (
                            <p className="text-muted mb-0 small">{producto.Descripcion}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="align-middle">
                      <strong>L. {producto.Precio}</strong>
                    </td>
                    <td className="align-middle">
                      <div className="d-flex align-items-center">
                        <span className="fw-bold mx-2">{producto.cantidad}</span>
                      </div>
                    </td>
                    <td className="align-middle">
                      <strong>L. {producto.Precio * producto.cantidad}</strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>

          <Col md={4}>
            <Card>
              <Card.Header>
                <h5 className="mb-0">Resumen del Pedido</h5>
              </Card.Header>
              <Card.Body>
                <div className="d-flex justify-content-between mb-2">
                  <span>Productos ({carrito.length})</span>
                  <span>L. {total}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Envío</span>
                  <span>L. 100.00</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Impuestos</span>
                  <span>L. {(total * 0.15).toFixed(2)}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-3">
                  <strong>Total</strong>
                  <strong>L. {(total + 100 + (total * 0.15)).toFixed(2)}</strong>
                </div>

                <Button
                  size="lg"
                  className="w-100 mb-2"
                  onClick={() => {
                    const user = JSON.parse(localStorage.getItem('user'));
                    if (user) {
                      navigate('/datos-envio');
                    } else {
                      navigate('/seleccion-login');
                    }
                  }}
                  style={{ backgroundColor: '#0c374eff', borderColor: '#022A3F' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#034a79ff'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#022A3F'}
                >
                  Finalizar compra
                </Button>

                <Button
                  className="w-100 mb-2"
                  style={{ backgroundColor: '#D7C5A1', borderColor: '#ada38fff', color: 'black' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#ada38fff'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#D7C5A1'}
                  onClick={() => navigate('/productos')}
                >
                  Seguir Comprando
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}