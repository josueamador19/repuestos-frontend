
import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './NavbarCustom.css';
import Carrito from './Carrito';

export default function NavbarCustom() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showCarrito, setShowCarrito] = useState(false);
  const [cantidadCarrito, setCantidadCarrito] = useState(0);

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
    const actualizarContador = () => {
      const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
      setCantidadCarrito(carrito.length);
    };

    actualizarContador();
    window.addEventListener('storage', actualizarContador);
    
  return () => {
    window.removeEventListener('storage', actualizarContador);
    window.removeEventListener('actualizarCarrito', actualizarContador);
  };
}, []);

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  return (
    <>
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
              <Nav.Link as={NavLink} to="/blog" className={({ isActive }) => isActive ? 'active-page' : ''}>Blog</Nav.Link>
              <Nav.Link as={NavLink} to="/contacto" className={({ isActive }) => isActive ? 'active-page' : ''}>Contacto</Nav.Link>
              <Nav.Link as={NavLink} to="/login" className={({ isActive }) => isActive ? 'active-page' : 'btn-login'}>Login</Nav.Link>
          
              <Nav.Link 
                as={Button}
                variant="outline-light"
                onClick={() => setShowCarrito(true)}
                className="position-relative btn-carrito"
                style={{ border: 'none', background: 'transparent' }}
              >
                🛒 
                {cantidadCarrito > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cantidadCarrito}
                  </span>
                )}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Carrito 
        show={showCarrito} 
        handleClose={() => setShowCarrito(false)} 
      />
    </>
  );
}
