import React from 'react';
import { Container, Badge } from 'react-bootstrap';

const categorias = ['Filtros', 'Frenos', 'Suspensión', 'Eléctrico', 'Lubricantes', 'Motor', 'Carrocería'];

export default function Categorias() {
  return (
    <Container id="categorias" className="my-5">
      <h2>Categorías</h2>
      {categorias.map((cat, index) => (
        <Badge key={index} bg="secondary" className="me-2 p-2">{cat}</Badge>
      ))}
    </Container>
  );
}
