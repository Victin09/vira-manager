import { Link, Outlet, useLocation } from "react-router-dom";

export const LandingTemplate = () => {
  const { pathname } = useLocation();

  return (
    <div className="uk-height-1-1">
      <nav
        className="uk-background-primary uk-light uk-width-1-1"
        data-uk-navbar
      >
        <Link to="/" className="uk-navbar-item uk-logo">
          vira.Manager
        </Link>
        <div className="uk-navbar-right">
          <div
            className="uk-navbar-toggle uk-hidden@m"
            data-uk-navbar-toggle-icon
            data-uk-toggle="target: #offcanvas-landing"
          ></div>
          <div className="uk-visible@m">
            <ul className="uk-navbar-nav">
              <li className={pathname === "/sign-in" ? "uk-active" : ""}>
                <Link to="/sign-in">Iniciar sesión</Link>
              </li>
              <li className={pathname === "/sign-up" ? "uk-active" : ""}>
                <Link to="/sign-up">Registrarse</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
      <div id="offcanvas-landing" data-uk-offcanvas="overlay: true">
        <div className="uk-offcanvas-bar">
          <button
            className="uk-offcanvas-close"
            type="button"
            data-uk-close
          ></button>

          <h3>Title</h3>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
      </div>
    </div>
  );
};
