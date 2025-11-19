import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarCustom from "./components/NavbarCustom";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import Checkout from './pages/Checkout';
import Blog from './pages/Blog'
import NuevaNoticia from './pages/NuevaNoticia'
import NoticiaDetalle from "./pages/NoticiaDetalle";
import FooterCustom from "./components/FooterCustom";
import Contacto from "./pages/Contacto";
import SeleccionLogin from "./pages/Loginselect";
import DatosEnvio from './pages/DatosEnvioPago';
import Login from './components/Login';
import Registro from './components/Registro';
import MisPedidos from './components/MisPedidos';
import DetallePedido from './components/DetallePedido';
import Politicas from "./pages/Politicas";
import Faq from "./pages/Faq";

export default function App() {
  return (
    <Router>
  <NavbarCustom />
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/productos" element={<Productos />} />
    <Route path="/checkout" element={<Checkout />} />
    <Route path="/blog" element={<Blog />} />
    <Route path="/blog/nueva" element={<NuevaNoticia />} />
    <Route path="/blog/noticia/:id" element={<NoticiaDetalle />} /> 
    <Route path="/contacto" element={<Contacto />} />
    <Route path="/seleccion-login" element={<SeleccionLogin/>} />
    <Route path="/datos-envio" element={<DatosEnvio />} />
    <Route path="/login" element={<Login />} />
    <Route path="/registro" element={<Registro />} />
    <Route path="/mis-pedidos" element={<MisPedidos />} />
    <Route path="/pedido/:pedidoId" element={<DetallePedido />} />
    <Route path="/politicas" element={<Politicas />} />
    <Route path="/faq" element={<Faq />} />
    
  </Routes>
  <FooterCustom/>
</Router>

  );
}
