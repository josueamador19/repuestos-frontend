import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Badge, Spinner, Alert, Button } from 'react-bootstrap'; // 🔥 Agrega Button aquí
import { useNavigate } from 'react-router-dom';
import { backendUrl } from '../services/api';

export default function MisPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/login');
      return;
    }

    cargarPedidos(user.id);
  }, [navigate]);

  const cargarPedidos = async (usuarioId) => {
    try {
      console.log('Cargando pedidos para usuario:', usuarioId); 
      
      const response = await fetch(`${backendUrl}/pedidos/usuario/${usuarioId}`);
      
      console.log('Status de respuesta:', response.status); 
      
      if (response.ok) {
        const data = await response.json();
        console.log(' Pedidos recibidos:', data); 
        setPedidos(data.pedidos || []);
      } else {
        const errorText = await response.text();
        console.error(' Error del servidor:', errorText); 
        setError('Error al cargar los pedidos');
      }
    } catch (error) {
      console.error('Error de conexión:', error); 
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
        <p className="mt-2">Cargando tus pedidos...</p>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row>
        <Col>
          <h1 className="mb-4">Mis Pedidos</h1>
          
          {error && (
            <Alert variant="danger">
              {error}
              <div className="mt-2">
                <Button 
                  variant="outline-danger" 
                  size="sm" 
                  onClick={() => window.location.reload()}
                >
                  Reintentar
                </Button>
              </div>
            </Alert>
          )}
          
          {pedidos.length === 0 && !error ? (
            <Card>
              <Card.Body className="text-center py-5">
                <h5>No tienes pedidos aún</h5>
                <p className="text-muted">Cuando realices un pedido, aparecerá aquí.</p>
                <Button 
                  variant="primary"
                  onClick={() => navigate('/productos')}
                >
                  Ir a Productos
                </Button>
              </Card.Body>
            </Card>
          ) : (
            <Card>
              <Card.Body>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>N° Pedido</th>
                      <th>Fecha</th>
                      <th>Estado</th>
                      <th>Total</th>
                      <th>Opciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pedidos.map((pedido) => (
                      <tr key={pedido.pedido_id}>
                        <td>#{pedido.pedido_id}</td>
                        <td>{new Date(pedido.fecha_pedido).toLocaleDateString()}</td>
                        <td>
                          <Badge bg={getEstadoVariant(pedido.estado)}>
                            {pedido.estado}
                          </Badge>
                        </td>
                        <td>L. {pedido.total?.toFixed(2) || '0.00'}</td>
                        <td>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => navigate(`/pedido/${pedido.pedido_id}`)}
                          >
                            Ver Detalle
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
}