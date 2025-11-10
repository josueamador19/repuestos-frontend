import React, { useEffect, useState } from "react";
import { Container, Spinner, Card } from "react-bootstrap";
import { getPoliticas } from "../services/api"; 

export default function Politicas() {
  const [politicas, setPoliticas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPoliticas = async () => {
      try {
        const data = await getPoliticas(); 
        setPoliticas(data);
      } catch (error) {
        console.error("Error cargando políticas:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPoliticas();
  }, []);

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Políticas de la Empresa</h2>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : politicas.length > 0 ? (
        politicas.map((p) => (
          <Card key={p.PoliticaID} className="mb-3 shadow-sm">
            <Card.Body>
              <Card.Title>{p.Titulo}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{p.Tipo}</Card.Subtitle>
              <Card.Text style={{ whiteSpace: "pre-line" }}>{p.Contenido}</Card.Text>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p className="text-center">No hay políticas disponibles en este momento.</p>
      )}
    </Container>
  );
}
