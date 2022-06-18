import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className=" h-100 d-flex flex-grow-1 flex-column align-items-center justify-content-center">
      <h1 className="fw-semibold">Vira Manager</h1>
      <p>
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
