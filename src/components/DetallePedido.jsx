import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Badge, Spinner, Alert, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { backendUrl } from '../services/api';
export default function DetallePedido() {
  const { pedidoId } = useParams();
  const navigate = useNavigate();
  const [pedido, setPedido] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    cargarDetallePedido();
  }, [pedidoId]);

  const cargarDetallePedido = async () => {
    try {
      const response = await fetch(`${backendUrl}/pedidos/${pedidoId}`);
      
      if (response.ok) {
        const data = await response.json();
        setPedido(data);
      } else {
        setError('Error al cargar el detalle del pedido');
      }
    } catch (error) {
      setError('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  const getEstadoVariant = (estado) => {
    switch (estado) {
      case 'Completado': return 'success';
      case 'Pendiente': return 'warning';
      case 'Enviado': return 'primary';
      case 'Cancelado': return 'danger';
      default: return 'secondary';
    }
  };

  if (loading) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger">{error}</Alert>
        <Button variant="primary" onClick={() => navigate('/mis-pedidos')}>
          Volver a mis pedidos
        </Button>
      </Container>
    );
  }

  if (!pedido) {
    return (
      <Container className="my-5">
        <Alert variant="warning">Pedido no encontrado</Alert>
        <Button variant="primary" onClick={() => navigate('/mis-pedidos')}>
          Volver a mis pedidos
        </Button>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row>
        <Col>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1>Detalle de tu pedido</h1>
            <Button variant="outline-secondary" onClick={() => navigate('/mis-pedidos')}>
              ← Volver a mis pedidos
            </Button>
          </div>

          <Row>
            <Col md={8}>
              <Card className="mb-4">
                <Card.Header>
                  <h5 className="mb-0">Productos</h5>
                </Card.Header>
                <Card.Body>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio unitario</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pedido.productos.map((producto, index) => (
                        <tr key={index}>
                          <td>{producto.nombre}</td>
                          <td>{producto.cantidad}</td>
                          <td>L. {producto.precio_unitario.toFixed(2)}</td>
                          <td>L. {producto.total.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="mb-4">
                <Card.Header>
                  <h5 className="mb-0">Información del pedido</h5>
                </Card.Header>
                <Card.Body>
                  <p><strong>Estado:</strong> <Badge bg={getEstadoVariant(pedido.estado)}>{pedido.estado}</Badge></p>
                  <p><strong>Fecha:</strong> {new Date(pedido.fecha_pedido).toLocaleDateString()}</p>
                  <p><strong>Método de pago:</strong> {pedido.metodo_pago}</p>
                </Card.Body>
              </Card>

              <Card className="mb-4">
                <Card.Header>
                  <h5 className="mb-0">Dirección de Envío</h5>
                </Card.Header>
                <Card.Body>
                  <p>{pedido.direccion.direccion}</p>
                  <p>{pedido.direccion.ciudad}, {pedido.direccion.departamento}</p>
                </Card.Body>
              </Card>

              {pedido.factura && (
                <Card>
                  <Card.Header>
                    <h5 className="mb-0">Factura</h5>
                  </Card.Header>
                  <Card.Body>
                    <p><strong>Subtotal:</strong> L. {pedido.factura.subtotal.toFixed(2)}</p>
                    <p><strong>Envío:</strong> L. {pedido.factura.costo_envio.toFixed(2)}</p>
                    <p><strong>Impuestos:</strong> L. {pedido.factura.impuesto.toFixed(2)}</p>
                    <hr />
                    <p><strong>Total:</strong> L. {pedido.factura.total.toFixed(2)}</p>
                  </Card.Body>
                </Card>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}