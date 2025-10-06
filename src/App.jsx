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

export default function App() {
  return (
    <Router>
  <NavbarCustom />
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/productos" element={<Productos />} />
    <Route path="/checkout" element={<Checkout />} />
    <Route path="/blog" element={<Blog />} />
    <Route path="/blog/noticia/:id" element={<NoticiaDetalle />} /> 
    <Route path="/nueva-noticia" element={<NuevaNoticia />} />

    
  </Routes>
  <FooterCustom/>
</Router>

  );
}
