import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div
      className="uk-flex uk-flex-column uk-flex-center uk-flex-middle"
      data-uk-height-viewport="offset-top: true"
    >
      <h1 className="uk-text-bold">Vira Manager</h1>
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
