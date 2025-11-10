import React, { useEffect, useState } from "react";
import { Container, Accordion, Spinner } from "react-bootstrap";
import { getFaq } from "../services/api";

export default function Faq() {
  const [faqList, setFaqList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const data = await getFaq();
        setFaqList(data);
      } catch (error) {
        console.error("Error cargando FAQ:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFaq();
  }, []);

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Preguntas Frecuentes</h2>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Accordion>
          {faqList.length > 0 ? (
            faqList.map((faq, index) => (
              <Accordion.Item eventKey={index.toString()} key={faq.FAQID || index}>
                <Accordion.Header>{faq.Pregunta}</Accordion.Header>
                <Accordion.Body>{faq.Respuesta}</Accordion.Body>
              </Accordion.Item>
            ))
          ) : (
            <p className="text-center">No hay preguntas frecuentes disponibles.</p>
          )}
        </Accordion>
      )}
    </Container>
  );
}
