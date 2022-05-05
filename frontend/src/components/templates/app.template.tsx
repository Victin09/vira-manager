import React from "react";

export const AppTemplate = () => {
  return (
    <div className="container-fluid vh-100 d-flex flex-column px-0">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-vds-toggle="collapse"
            data-vds-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Link
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-vds-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled">Disabled</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container-fluid d-flex flex-grow-1 flex-column">
        <div className="row flex-grow-1">
          <div className="col-md-4 bg-warning">
            <div>
              <div className="row m-1">
                <div className="col-md-11">Chats</div>
                <div className="col-md-1">
                  <i className="fas fa-plus-circle"></i>
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-md-12">
                  <form
                    className="form-inline"
                    style={{
                      height: "0%",
                      width: "100%",
                      paddingLeft: 0,
                      paddingRight: 0,
                      paddingTop: "8px"
                    }}
                  >
                    <input
                      className="form-control  mr-sm-1"
                      style={{ width: "80%" }}
                      type="search"
                      placeholder="Suchen"
                      aria-label="Search"
                    />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
                      Suchen
                    </button>
                  </form>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="list-group">
                    <div>
                      <a
                        href="#"
                        className="list-group-item list-group-item-action flex-column align-items-start"
                        style={{ marginTop: "7.5px", marginBottom: "7.5px" }}
                      >
                        <div className="d-flex w-100 justify-content-between">
                          <h5 className="mb-1">List group item heading</h5>
                          <small>3 days ago</small>
                        </div>
                        <div className="row">
                          <div className="col-md-11">Donec id elit non mi porta...</div>
                          <div className="col-md-1">
                            <span className="badge badge-primary badge-pill text-right">5</span>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8 bg-primary">
            <div>
              <div className="row">
                <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                      <div className="row">
                        <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                          <img src="..." className="image-head-chat" alt="Responsive image" />
                        </div>

                        <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">Text</div>

                        <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">Icons</div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                      Nachrichten
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                      Eingabe
                      <div className="row">Form</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
