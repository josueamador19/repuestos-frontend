import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';

export default function QuienesSomos() {
  return (
    <Container id="quienes-somos" className="my-5">
      <h2 className="mb-4 text-center">Quiénes Somos</h2>

      <Row className="g-4">
        <Col md={6}>
          <Card className="h-100 shadow-sm">
            <Card.Body style={{ textAlign: 'justify' }}>
              <Card.Title>Historia</Card.Title>
              <Card.Text>
                RepuestosExpress nació en el año 2010 con la visión de ofrecer a los conductores una alternativa rápida, confiable y económica para encontrar las piezas que sus vehículos necesitan. 
                Iniciamos como un pequeño local familiar con un inventario limitado, pero con una gran pasión por los autos y un compromiso firme con nuestros clientes. 
                A lo largo de los años, hemos crecido gracias a la confianza de miles de clientes que han reconocido nuestro esfuerzo por brindar atención personalizada, precios competitivos y productos de calidad certificada. 
                Hoy en día, RepuestosExpress cuenta con un catálogo amplio de repuestos nacionales e importados, y con presencia tanto en tienda física como en plataformas digitales, manteniendo siempre la esencia que nos caracteriza: servicio rápido, confiable y al alcance de todos.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="h-100 shadow-sm">
            <Card.Body style={{ textAlign: 'justify' }}>
              <Card.Title>Misión</Card.Title>
              <Card.Text>
                Proveer a nuestros clientes repuestos automotrices de alta calidad de manera rápida, confiable y accesible, respaldados por un servicio profesional y personalizado. 
                Buscamos ser el aliado de confianza de talleres, distribuidores y propietarios de vehículos, asegurando su satisfacción total a través de la excelencia en atención, variedad y precio.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="h-100 shadow-sm">
            <Card.Body style={{ textAlign: 'justify' }}>
              <Card.Title>Visión</Card.Title>
              <Card.Text>
                Ser reconocidos a nivel nacional como la empresa líder en venta de repuestos automotrices, destacándonos por nuestra innovación, servicio al cliente y compromiso con la calidad. 
                Queremos convertirnos en la primera opción para quienes buscan soluciones rápidas y efectivas en el mantenimiento de sus vehículos, impulsando la transformación digital del sector automotriz.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="h-100 shadow-sm">
            <Card.Body style={{ textAlign: 'justify' }}>
              <Card.Title>Valores</Card.Title>
              <Card.Text>
                Compromiso, Honestidad, Responsabilidad, Calidad, Rapidez, Servicio e Innovación. 
                Nos esforzamos por cumplir con cada cliente, ofrecer información transparente, trabajar solo con marcas confiables y entregar cada pedido de manera ágil, siempre con un servicio cercano y tecnología que facilite la experiencia.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={12}>
          <Card className="h-100 shadow-sm bg-primary text-white text-center">
            <Card.Body>
              <Card.Title>Lema</Card.Title>
              <Card.Text style={{ fontStyle: 'italic' }}>
                “RepuestosExpress: calidad y confianza, a la velocidad que tu auto necesita.”
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
