import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Card, Alert, Spinner } from "react-bootstrap";

const API_URL = "http://127.0.0.1:8000";

export default function Contacto() {
    const [contactInfo, setContactInfo] = useState(null);
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        asunto: "",
        mensaje: ""
    });
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        async function fetchInfo() {
            try {
                const res = await fetch(`${API_URL}/contacto/info`);
                const data = await res.json();
                setContactInfo(data);
            } catch (err) {
                console.error("Error al obtener información de contacto:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchInfo();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSending(true);
        setAlert(null);

        try {
            const form = new FormData();
            form.append("nombre", formData.nombre);
            form.append("email", formData.email);
            form.append("asunto", formData.asunto);
            form.append("mensaje", formData.mensaje);

            const res = await fetch(`${API_URL}/contacto/mensaje`, {
                method: "POST",
                body: form
            });

            if (!res.ok) throw new Error("Error al enviar mensaje");

            const data = await res.json();
            setAlert({ type: "success", message: data.message });
            setFormData({ nombre: "", email: "", asunto: "", mensaje: "" });
        } catch (err) {
            setAlert({ type: "danger", message: "Error al enviar el mensaje." });
        } finally {
            setSending(false);
        }
    };

    if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;

    return (
        <Container className="mt-5 mb-5">
            <Row className="justify-content-center">
                <Col md={8}>
                    <Card className="shadow p-4 rounded-4">
                        <h3 className="text-center mb-4">Contáctanos</h3>

                        {alert && (
                            <Alert variant={alert.type} onClose={() => setAlert(null)} dismissible>
                                {alert.message}
                            </Alert>
                        )}

                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="nombre">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Correo electrónico</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="asunto">
                                <Form.Label>Asunto</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="asunto"
                                    value={formData.asunto}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="mensaje">
                                <Form.Label>Mensaje</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={4}
                                    name="mensaje"
                                    value={formData.mensaje}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <div className="d-grid">
                                <Button variant="primary" type="submit" disabled={sending}>
                                    {sending ? "Enviando..." : "Enviar mensaje"}
                                </Button>
                            </div>
                        </Form>

                        {contactInfo && (
                            <div className="mt-5 text-center">
                                <h5>Información de contacto</h5>
                                <p>
                                    <strong>Dirección:</strong> {contactInfo.direccion}<br />
                                    <strong>Teléfono:</strong> {contactInfo.telefono}<br />
                                    <strong>Correo:</strong> {contactInfo.correo}<br />
                                    <strong>Horario:</strong> {contactInfo.horario}
                                </p>
                                {contactInfo.mapa_url && (
                                    <iframe
                                        src={contactInfo.mapa_url}
                                        width="100%"
                                        height="250"
                                        style={{ border: 0 }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        title="Mapa"
                                    ></iframe>
                                )}
                            </div>
                        )}
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}
