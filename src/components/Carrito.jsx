import React from 'react';
import { Button, Row, Col, Offcanvas } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Carrito({ show, handleClose }) {
  const navigate = useNavigate();
  const [carrito, setCarrito] = React.useState([]);

  React.useEffect(() => {
    const carritoStorage = JSON.parse(localStorage.getItem('carrito')) || [];
    setCarrito(carritoStorage);
  }, [show]);

    const irAlCheckout = () => {
    handleClose(); 
    navigate('/checkout'); 
  };

  const eliminarDelCarrito = (productoId) => {
    const nuevoCarrito = carrito.filter(item => item.id !== productoId);
    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
    window.dispatchEvent(new Event('storage'));
  };

  const actualizarCantidad = (productoId, nuevaCantidad) => {
    if (nuevaCantidad < 0) return;
    
  const nuevoCarrito = carrito.map(item =>
      item.id === productoId
        ? { ...item, cantidad: nuevaCantidad }
        : item
    );

  setCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <Offcanvas 
      show={show} 
      onHide={handleClose} 
      placement="end" 
      style={{ width: '400px' }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>🛒 Mi carrito</Offcanvas.Title>
      </Offcanvas.Header>
      
      <Offcanvas.Body >
        {carrito.length === 0 ? (
          <div className="text-center py-4">
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>🛒</div>
            <h5>Tu carrito está vacío</h5>
            <p className="text-muted">
              ¡Bienvenida/o! Tu carrito no tiene productos.
            </p>
            <Button variant="primary" onClick={handleClose}>
              Comenzar a comprar
            </Button>
          </div>
        ) : (

          <div style={{ height: 'calc(100vh - 200px)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1 }}>
              <h6>Tienes {carrito.length} producto(s) en el carrito:</h6>
              {carrito.map((producto) => (
                <Row key={producto.id} className="mb-3 border-bottom pb-2 align-items-center">
                  <Col xs={3}>
                    <img 
                      src={producto.ImagenURL || "https://via.placeholder.com/150"} 
                      alt={producto.nombre}
                      style={{ width: '100%', height: '50px', objectFit: 'contain' }}
                    />
                  </Col>
                  <Col xs={5}>
                    <h6 className="mb-1 small">{producto.nombre}</h6>
                    <small className="text-muted">Cant: {producto.cantidad}</small>
                    
                     <div className="d-flex align-items-center mt-2">
                      <Button 
                        variant="outline-secondary" 
                        size="sm"
                        onClick={() => actualizarCantidad(producto.id, producto.cantidad - 1)}
                        disabled={producto.cantidad <= 1}
                        style={{ width: '30px', height: '30px', padding: 0 }}
                      >
                        -
                      </Button>
                       <div 
                        className="mx-2 fw-bold border rounded text-center"
                        style={{ 
                        width: '50px', 
                        height: '30px', 
                        lineHeight: '30px',
                        backgroundColor: '#f8f9fa'
                        }}
                        >
                        {producto.cantidad}
                      </div>

                      <Button 
                        variant="outline-secondary" 
                        size="sm"
                        onClick={() => actualizarCantidad(producto.id, producto.cantidad + 1)}
                        style={{ width: '30px', height: '30px', padding: 0 }}
                      >
                        +
                      </Button>
                    </div>
                  </Col>
                  <Col xs={4} className="text-end">
                    <p className="fw-bold mb-1 small">L. {producto.Precio * producto.cantidad}</p>
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      onClick={() => eliminarDelCarrito(producto.id)}
                      className="mt-1"
                    >
                      🗑️
                    </Button>
                  </Col>
                </Row>
              ))}
            </div>

             <div style={{ 
              borderTop: '1px solid #dee2e6', 
              padding: '1rem',
              backgroundColor: 'white',
              position: 'sticky',
              bottom: 0
            }}></div>
           
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Total:</h5>
                <h5 className="mb-0 text-primary">L. {carrito.reduce((total, item) => total + (item.Precio * item.cantidad), 0)}</h5>
              </div>
              
              <div className="d-grid gap-2">
                <Button variant="secondary" onClick={handleClose}>
                  Seguir comprando
                </Button>
                <Button variant="primary" onClick={irAlCheckout}>
                  Realizar pago
                </Button>
              </div>
            </div>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
}

