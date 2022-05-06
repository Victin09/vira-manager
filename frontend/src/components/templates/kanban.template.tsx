import React from "react";
import { Outlet } from "react-router-dom";

export const KanbanLayout = () => {
  return (
    <div className="h-100 row flex-grow-1">
      <div className="col-md-2 shadow-sm">
        <ul className="list-unstyled">
          <li>
            <button
              className="btn btn-toggle align-items-center rounded collapsed"
              data-vds-toggle="collapse"
              data-vds-target="#home-collapse"
              aria-expanded="false"
            >
              Espacios de trabajo
            </button>
            <div className="collapse" id="home-collapse">
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 ps-3 small">
                <li>
                  <a href="#" className="link-dark rounded">
                    Overview
                  </a>
                </li>
                <li>
                  <a href="#" className="link-dark rounded">
                    Updates
                  </a>
                </li>
                <li>
                  <a href="#" className="link-dark rounded">
                    Reports
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li>Espacios de trabajo</li>
        </ul>
      </div>
      <div className="col-md-10">{<Outlet />}</div>
    </div>
  );
};
