import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { backendUrl } from '../services/api';
export default function DatosEnvioPago() {
  const navigate = useNavigate();
  const [metodoPago, setMetodoPago] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    departamento: '',
    codigoPostal: ''
  });

  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const subtotal = carrito.reduce((sum, item) => sum + (item.Precio * item.cantidad), 0);
  const user = JSON.parse(localStorage.getItem('user'));

useEffect(() => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    const nombreCompleto = user.nombre.split(' ');
    const nombre = nombreCompleto[0] || '';
    const apellidos = nombreCompleto.slice(1).join(' ') || '';
    
    setFormData(prev => ({
      ...prev,
      nombre: nombre,
      apellidos: apellidos,
      email: user.email || '',
      telefono: user.telefono || ''
    }));
  }
}, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const finalizarCompra = async () => {
    if (!formData.direccion || !formData.ciudad || !formData.departamento) {
      setError('Por favor completa la dirección de envío');
      return;
    }

    if (!metodoPago) {
      setError('Por favor selecciona un método de pago');
      return;
    }

    if (carrito.length === 0) {
      setError('El carrito está vacío');
      return;
    }

    setLoading(true);
    setError('');

    try {
      let metodoPagoId;
      switch(metodoPago) {
        case 'tarjeta':
          metodoPagoId = 1; 
          break;
        case 'efectivo':
          metodoPagoId = 3; 
          break;
      }

      if (user) {
        const direccionResponse = await fetch(`${backendUrl}/pedidos/direcciones/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            usuario_id: user.id,
            direccion: formData.direccion,
            ciudad: formData.ciudad,
            departamento: formData.departamento,
            codigo_postal: formData.codigoPostal
          })
        });

        if (!direccionResponse.ok) {
          throw new Error('Error al crear la dirección de envío');
        }

        const direccionData = await direccionResponse.json();

        const pedidoResponse = await fetch(`${backendUrl}/pedidos/usuario/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            usuario_id: user.id,
            direccion_id: direccionData.direccion_id,
            metodo_pago_id: metodoPagoId,
            productos: carrito.map(item => ({
              producto_id: item.id,
              cantidad: item.cantidad,
              precio_unitario: item.Precio
            }))
          })
        });

        if (!pedidoResponse.ok) {
          const errorData = await pedidoResponse.json();
          throw new Error(errorData.detail || 'Error al crear pedido');
        }

        const pedidoData = await pedidoResponse.json();
        
        localStorage.removeItem('carrito');
        window.dispatchEvent(new Event('actualizarCarrito'));
        
        alert(`¡Pedido realizado con éxito!`);
        navigate('/mis-pedidos');

      } else {
        const pedidoResponse = await fetch(`${backendUrl}/pedidos/invitado/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nombre_cliente: formData.nombre + ' ' + formData.apellidos,
            email: formData.email,
            telefono: formData.telefono,
            direccion: formData.direccion,
            ciudad: formData.ciudad,
            departamento: formData.departamento,
            codigo_postal: formData.codigoPostal,
            metodo_pago_id: metodoPagoId,
            productos: carrito.map(item => ({
              producto_id: item.id,
              cantidad: item.cantidad,
              precio_unitario: item.Precio
            }))
          })
        });

        if (!pedidoResponse.ok) {
          const errorData = await pedidoResponse.json();
          throw new Error(errorData.detail || 'Error al crear pedido');
        }

        const pedidoData = await pedidoResponse.json();
        localStorage.removeItem('carrito');
        window.dispatchEvent(new Event('actualizarCarrito'));
        
        alert(`¡Pedido realizado con éxito! Número de pedido: ${pedidoData.pedido_id}`);
        navigate('/'); 
      }

    } catch (error) {
      console.error('Error:', error);
      setError('Error al procesar el pedido: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    finalizarCompra();
  };

  if (carrito.length === 0) {
    return (
      <Container className="my-5">
        <Alert variant="warning" className="text-center">
          <h4>Tu carrito está vacío</h4>
          <p>No hay productos para procesar el pago.</p>
          <Button variant="primary" onClick={() => navigate('/productos')}>
            Ir a Productos
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <Row className="mb-4">
        <Col className="text-center">
          <div className="d-flex justify-content-center align-items-center flex-wrap">
            <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center mx-2" 
                 style={{ width: '35px', height: '35px' }}>
              1
            </div>
            <div className="mx-1 small">Verifica tu carrito</div>
            
            <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center mx-2" 
                 style={{ width: '35px', height: '35px' }}>
              2
            </div>
            <div className="mx-1 small">Inicia sesión</div>
            
            <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-2" 
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

      {error && <Alert variant="danger">{error}</Alert>}
      {user && (
        <Alert variant="info" className="mb-4">
          <strong> Hola, {user.nombre.split(' ')[0]}!</strong> Confirma tus datos de entrega.
        </Alert>
      )}
      <Row>
        <Col md={8}>
          <h4 className="mb-4">Datos de Contacto</h4>
          <Card className="mb-4">
            <Card.Body>
              <p className="text-muted">
                {user 
                  ? "Verifica y completa la dirección de envío."
                  : "Solicitamos únicamente la información esencial para la finalización de la compra."
                }
              </p>
              
              <Form.Group className="mb-3">
                <Form.Label><strong>Correo *</strong></Form.Label>
                <Form.Control 
                  type="email" 
                  name="email"
                  placeholder="tu@email.com" 
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={user}
                />
                {user && <Form.Text className="text-muted">Este campo está bloqueado porque iniciaste sesión.</Form.Text>}
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label><strong>Nombre *</strong></Form.Label>
                    <Form.Control 
                      type="text" 
                      name="nombre"
                      placeholder="Tu nombre" 
                      value={formData.nombre}
                      onChange={handleInputChange}
                      required 
                      disabled={user}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label><strong>Apellidos</strong></Form.Label>
                    <Form.Control 
                      type="text" 
                      name="apellidos"
                      placeholder="Tus apellidos" 
                      value={formData.apellidos}
                      onChange={handleInputChange}
                      disabled={user}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label><strong>Teléfono *</strong></Form.Label>
                <Form.Control 
                  type="tel" 
                  name="telefono"
                  placeholder="+504 1234-5678" 
                  value={formData.telefono}
                  onChange={handleInputChange}
                  required
                  disabled={user}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label><strong>Dirección de envío *</strong></Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={3} 
                  name="direccion"
                  placeholder="Dirección completa (calle, número, colonia, etc.)" 
                  value={formData.direccion}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label><strong>Ciudad *</strong></Form.Label>
                    <Form.Control 
                      type="text" 
                      name="ciudad"
                      placeholder="Ciudad" 
                      value={formData.ciudad}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label><strong>Departamento *</strong></Form.Label>
                    <Form.Control 
                      type="text" 
                      name="departamento"
                      placeholder="Departamento" 
                      value={formData.departamento}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label><strong>Código Postal</strong></Form.Label>
                <Form.Control 
                  type="text" 
                  name="codigoPostal"
                  placeholder="Código postal" 
                  value={formData.codigoPostal}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Card.Body>
          </Card>

          <h4 className="mb-4">Selecciona un método de pago</h4>
          <Card>
            <Card.Body>
              <Form.Group>
                <Form.Check
                  type="radio"
                  id="tarjeta-credito"
                  name="metodoPago"
                  label="Tarjeta de crédito o débito"
                  checked={metodoPago === 'tarjeta'}
                  onChange={() => setMetodoPago('tarjeta')}
                  className="mb-3"
                />
                
                <Form.Check
                  type="radio"
                  id="efectivo"
                  name="metodoPago"
                  label="Pago en efectivo al recoger"
                  checked={metodoPago === 'efectivo'}
                  onChange={() => setMetodoPago('efectivo')}
                  className="mb-3"
                />
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="sticky-top" style={{ top: '20px' }}>
            <Card.Header>
              <h5 className="mb-0">Resumen de compra</h5>
            </Card.Header>
            <Card.Body>
              {carrito.map((producto) => (
                <div key={producto.id} className="mb-3 border-bottom pb-3">
                  <h6 className="mb-1">{producto.nombre}</h6>
                  {producto.Descripcion && (
                    <p className="text-muted small mb-1">{producto.Descripcion}</p>
                  )}
                  <div className="d-flex justify-content-between align-items-center">
                    <small>Cantidad: {producto.cantidad}</small>
                    <strong>L. {producto.Precio * producto.cantidad}</strong>
                  </div>
                </div>
              ))}
              
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>L. {subtotal.toFixed(2)}</span>
              </div>
              
              <div className="d-flex justify-content-between mb-2">
                <span>Gastos del envío</span>
                <span className="text-success">L. 100.00</span>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span>Impuestos</span>
                <span>L. {(subtotal * 0.15).toFixed(2)}</span>
              </div>
              
              <hr />
              
              <div className="d-flex justify-content-between mb-3">
                <strong>Total</strong>
                <strong>L. {(subtotal + 100 + (subtotal * 0.15)).toFixed(2)}</strong>
              </div>

              <Button 
                variant="primary" 
                size="lg" 
                className="w-100 mb-2"
                onClick={handleSubmit}
                disabled={loading}
                style={{ backgroundColor: '#0c374eff', borderColor: '#022A3F'}}
                onMouseEnter={(e)=>e.target.style.backgroundColor='#034a79ff'}
                onMouseLeave={(e)=>e.target.style.backgroundColor='#022A3F'}
              >
                {loading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    Procesando...
                  </>
                ) : (
                  'Confirmar Pedido'
                )}
              </Button>
              
              <Button 
                variant="outline-secondary" 
                className="w-100"
                onClick={() => navigate('/checkout')}
                disabled={loading}
              >
                ← Volver al carrito
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}