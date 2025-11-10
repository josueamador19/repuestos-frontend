import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import './NavbarCustom.css';
import Carrito from './Carrito';
import Logo from '../assets/logo.png'; 

export default function NavbarCustom() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showCarrito, setShowCarrito] = useState(false);
  const [cantidadCarrito, setCantidadCarrito] = useState(0);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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
    const loadUser = () => {
      const userData = localStorage.getItem('user');
      if (userData) setUser(JSON.parse(userData));
      else setUser(null);
    };
    loadUser();
    const handleStorageChange = () => loadUser();
    const handleLogin = () => loadUser();
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('userLogin', handleLogin);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userLogin', handleLogin);
    };
  }, []);

  useEffect(() => {
    const actualizarContador = () => {
      const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
      setCantidadCarrito(carrito.length);
    };
    actualizarContador();
    window.addEventListener('storage', actualizarContador);
    window.addEventListener('actualizarCarrito', actualizarContador);
    return () => {
      window.removeEventListener('storage', actualizarContador);
      window.removeEventListener('actualizarCarrito', actualizarContador);
    };
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.dispatchEvent(new Event('userLogout'));
    navigate('/');
  };

  return (
    <>
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        className={`custom-navbar ${show ? 'navbar-show' : 'navbar-hide'}`}
      >
        <Container>
          <Navbar.Brand as={NavLink} to="/" end className="d-flex align-items-center">
            <img
              src={Logo}
              alt="Logo RepuestosExpress"
              style={{ width: '100px', height: '80px', marginRight: '10px' , filter:'brightness(0) invert(1)'}}
            />
            RepuestosExpress
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center">
              {!user && (
                <Nav.Link as={NavLink} to="/" end className={({ isActive }) => isActive ? 'active-page' : ''}>
                  Home
                </Nav.Link>
              )}
              <Nav.Link as={NavLink} to="/productos" className={({ isActive }) => isActive ? 'active-page' : ''}>
                Productos
              </Nav.Link>
              <Nav.Link as={NavLink} to="/blog" className={({ isActive }) => isActive ? 'active-page' : ''}>
                Blog
              </Nav.Link>
              <Nav.Link as={NavLink} to="/contacto" className={({ isActive }) => isActive ? 'active-page' : ''}>
                Contacto
              </Nav.Link>
              {user ? (
                <NavDropdown 
                  title={<span>👤 {user.nombre.split(' ')[0]}</span>} 
                  id="user-dropdown"
                  align="end"
                >
                  <NavDropdown.Item as={NavLink} to="/mis-pedidos" className="dropdown-item-custom">
                    Mis pedidos
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout} className="dropdown-item-custom text-danger">
                    Cerrar sesión
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link as={NavLink} to="/login" className={({ isActive }) => isActive ? 'active-page' : ''}>
                  Inicio de sesión
                </Nav.Link>
              )}
              <Nav.Link 
                as={Button}
                variant="outline-light"
                onClick={() => setShowCarrito(true)}
                className="position-relative btn-carrito ms-2"
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
