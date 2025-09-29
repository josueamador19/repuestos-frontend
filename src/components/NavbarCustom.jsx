// src/components/NavbarCustom.jsx
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './NavbarCustom.css';

export default function NavbarCustom() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 50) {
      setShow(false);
    } else {
      setShow(true);
    }
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      className={`custom-navbar ${show ? 'navbar-show' : 'navbar-hide'}`}
    >
      <Container>
        <Navbar.Brand as={NavLink} to="/" end>
          Repuestos
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" end className={({ isActive }) => isActive ? 'active-page' : ''}>Home</Nav.Link>
            <Nav.Link as={NavLink} to="/productos" className={({ isActive }) => isActive ? 'active-page' : ''}>Productos</Nav.Link>
            <Nav.Link as={NavLink} to="/categorias" className={({ isActive }) => isActive ? 'active-page' : ''}>Categorías</Nav.Link>
            <Nav.Link as={NavLink} to="/login" className={({ isActive }) => isActive ? 'active-page' : 'btn-login'}>Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
