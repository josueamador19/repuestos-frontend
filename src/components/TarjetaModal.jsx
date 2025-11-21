import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./TarjetaModal.css";

export default function TarjetaModal({ onClose }) {
  const [nombre, setNombre] = useState("");
  const [numero, setNumero] = useState("");
  const [expira, setExpira] = useState("");
  const [cvv, setCvv] = useState("");


  const getTipoTarjeta = (numero) => {
    if (numero.startsWith("4")) return "visa";
    if (numero.startsWith("5")) return "mastercard";
    if (numero.startsWith("34") || numero.startsWith("37")) return "amex";
    if (numero.startsWith("6")) return "discover";
    if (numero.startsWith("36") || numero.startsWith("38")) return "diners";
    if (numero.startsWith("62")) return "unionpay";
    return "default";
  };

  const tipoTarjeta = getTipoTarjeta(numero.replace(/\s/g, ""));


  const logos = {
    visa: "https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png",
    mastercard:
      "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg",
    amex: "https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg",
    discover:
      "https://upload.wikimedia.org/wikipedia/commons/0/0c/Discover_Card_logo.svg",
    diners:
      "https://upload.wikimedia.org/wikipedia/commons/1/16/Diners_Club_Logo3.svg",
    unionpay:
      "https://upload.wikimedia.org/wikipedia/commons/5/50/UnionPay_logo.svg",
    default: null,
  };

  return (
    <div className="card-contenedor bg-dark text-white p-4 rounded border border-light border-opacity-25 shadow mx-auto">

   
      <div className="d-flex align-items-center justify-content-between mb-3">
        <input
          className="form-control tarjeta-input me-2"
          type="text"
          placeholder="Full Name"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <div className="logo-tarjeta d-flex align-items-center justify-content-center border border-light border-opacity-25 rounded">
          {tipoTarjeta !== "default" ? (
            <img src={logos[tipoTarjeta]} alt={tipoTarjeta} style={{ width: "45px" }} />
          ) : (
            <svg
              className="text-white"
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              viewBox="0 0 48 48"
            >
              <path fill="#ff9800" d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z"></path>
              <path fill="#d50000" d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z"></path>
              <path
                fill="#ff3d00"
                d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z"
              ></path>
            </svg>
          )}
        </div>
      </div>

 
      <div className="mb-3">
        <input
          className="form-control tarjeta-input"
          type="text"
          placeholder="0000 0000 0000 0000"
          maxLength="19"
          value={numero}
          onChange={(e) =>
            setNumero(
              e.target.value
                .replace(/\D/g, "")
                .replace(/(.{4})/g, "$1 ")
                .trim()
            )
          }
        />
      </div>


      <div className="d-flex gap-2 mb-3">
        <input
          className="form-control tarjeta-input"
          type="text"
          placeholder="MM/AA"
          maxLength="5"
          value={expira}
          onChange={(e) =>
            setExpira(
              e.target.value
                .replace(/\D/g, "")
                .replace(/(\d{2})(\d{1,2})/, "$1/$2")
            )
          }
        />

        <input
          className="form-control tarjeta-input"
          type="text"
          placeholder="CVV"
          maxLength="3"
          value={cvv}
          onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
        />
      </div>
      <Button variant="primary" className="w-100" onClick={onClose}>
        Pagar
      </Button>
    </div>
  );
}
