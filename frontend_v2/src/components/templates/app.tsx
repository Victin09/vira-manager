import { useAuth } from "../../providers/auth";
import { Link, Outlet, useLocation } from "react-router-dom";
import { getInitials } from "../../utils/text";

export const AppTemplate = () => {
  const { pathname } = useLocation();
  const { getUser } = useAuth();

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
            data-uk-toggle="target: #offcanvas-app"
          ></div>
          <div className="uk-visible@m">
            <ul className="uk-navbar-nav">
              <li className={pathname === "/profile" ? "uk-active" : ""}>
                <Link to="/profile">
                  <span
                    className="uk-icon-button uk-light uk-margin-small-right"
                    data-uk-icon="icon: user"
                  ></span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
      <div id="offcanvas-app" data-uk-offcanvas="overlay: true">
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
