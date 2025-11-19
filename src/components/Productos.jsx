import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Spinner, Alert } from "react-bootstrap";
import { getProductos } from "../services/api";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cantidadCarrito, setCantidadCarrito] = useState(0);

  const agregarAlCarrito = (producto) => {
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
      nuevoCarrito = [...carritoActual, { ...producto, cantidad: 1 }];
    }

    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
    setCantidadCarrito(nuevoCarrito.length);
    window.dispatchEvent(new Event('actualizarCarrito'));
  };

  useEffect(() => {
     console.log("backendUrl en Productos.jsx:", backendUrl);
    getProductos()
      .then((data) => {
        setProductos(data.productos || []);
        setLoading(false);

        const carritoStorage = JSON.parse(localStorage.getItem('carrito')) || [];
        setCantidadCarrito(carritoStorage.length);
      })
      .catch((err) => {
        console.error(err);
        setError("Error al obtener los productos");
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
        {productos.map((producto) => (
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
                  variant="primary" 
                  disabled={producto.Stock === 0}
                  onClick={() => agregarAlCarrito(producto)}
                >
                  🛒 Agregar
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
