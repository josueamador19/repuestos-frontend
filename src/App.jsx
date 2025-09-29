import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarCustom from "./components/NavbarCustom";
import Home from "./pages/Home";
import Productos from "./pages/Productos";

export default function App() {
  return (
    <Router>
  <NavbarCustom />
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/productos" element={<Productos />} />
  </Routes>
</Router>

  );
}
