import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center h-100 text-center">
      <h1 className="fs-2 fw-bold">Vira Manager</h1>
      <p className="py-6">
        Vira Manager es un software que incluye herramientas para la gestión de
        proyectos.
      </p>
      <Link to="/sign-in" className="">
        Empezar ahora
      </Link>
    </div>
  );
};

export default Landing;
