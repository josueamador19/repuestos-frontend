import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarCustom from "./components/NavbarCustom";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import Checkout from './pages/Checkout';

export default function App() {
  return (
    <Router>
  <NavbarCustom />
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/productos" element={<Productos />} />
    <Route path="/checkout" element={<Checkout />} />
    
  </Routes>
</Router>

  );
}
