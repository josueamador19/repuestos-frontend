
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Spinner, Alert } from "react-bootstrap";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [botonesEstado, setBotonesEstado] = useState({}); 

  
  const agregarAlCarrito = async (producto) => {
    setBotonesEstado(prev => ({ ...prev, [producto.id]: 'loading' }));
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const carritoActual = JSON.parse(localStorage.getItem('carrito')) || [];
    const productoExistente = carritoActual.find(item => item.id === producto.id);
    let nuevoCarrito;

    if (productoExistente) {
      nuevoCarrito = carritoActual.map(item =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );
    } else {
      nuevoCarrito = [...carritoActual, { 
        ...producto, 
        cantidad: 1 
      }];
    }
    
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
    
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new Event('actualizarCarrito'));
    
    setBotonesEstado(prev => ({ ...prev, [producto.id]: 'added' }));
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setBotonesEstado(prev => ({ ...prev, [producto.id]: null }));
  };

  useEffect(() => {
    fetch("http://127.0.0.1:8000/productos/")
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener los productos");
        return res.json();
      })
      .then((data) => {
        
        setProductos(data.productos || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h1 className="mb-4">Nuestros Productos</h1>
      
      <Row>
        {productos.map((producto) => {
          const estadoBoton = botonesEstado[producto.id];
          
          return (
            <Col key={producto.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card>
                <Card.Img
                  variant="top"
                  src={producto.ImagenURL || "https://via.placeholder.com/150"}
                  style={{ objectFit: "contain", height: "200px", width: "100%" }}
                />
                <Card.Body>
                  <Card.Title>{producto.nombre}</Card.Title>
                  <Card.Text>
                    Precio: L.{producto.Precio} <br />
                    Disponibilidad: {producto.Stock > 0 ? producto.Stock : "Agotado"} <br />
                    Categoría: {producto.Categoria}
                  </Card.Text>
                  
                  <Button 
                    variant={estadoBoton === 'added' ? 'outline-primary' : 'primary'}
                    disabled={producto.Stock === 0 || estadoBoton === 'loading'}
                    onClick={() => agregarAlCarrito(producto)}
                    className="w-100"
                  >
                    {estadoBoton === 'loading' ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="me-2"
                        />
                        Agregando...
                      </>
                    ) : estadoBoton === 'added' ? (
                      "✅ Añadido!"
                    ) : (
                      "🛒 Agregar"
                    )}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
