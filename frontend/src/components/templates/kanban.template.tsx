import React from "react";
import { Outlet } from "react-router-dom";
import "@vira/components/templates/styles/kanban.template.css";

export const KanbanLayout = () => {
  return (
    <div className="h-100 row flex-grow-1">
      <div className="col-md-2 shadow-sm">
        <div className="flex-shrink-0 pt-2 bg-white" style={{ width: "280px" }}>
          <ul className="list-unstyled ps-0">
            <li className="mb-1">
              <button
                className="btn btn-toggle align-items-center rounded collapsed"
                data-vds-toggle="collapse"
                data-vds-target="#home-collapse"
                aria-expanded="true"
              >
                Home
              </button>
              <div className="collapse show" id="home-collapse">
                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
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
            <li className="mb-1">
              <button
                className="btn btn-toggle align-items-center rounded collapsed"
                data-vds-toggle="collapse"
                data-vds-target="#dashboard-collapse"
                aria-expanded="false"
              >
                Dashboard
              </button>
              <div className="collapse" id="dashboard-collapse">
                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                  <li>
                    <a href="#" className="link-dark rounded">
                      Overview
                    </a>
                  </li>
                  <li>
                    <a href="#" className="link-dark rounded">
                      Weekly
                    </a>
                  </li>
                  <li>
                    <a href="#" className="link-dark rounded">
                      Monthly
                    </a>
                  </li>
                  <li>
                    <a href="#" className="link-dark rounded">
                      Annually
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="mb-1">
              <button
                className="btn btn-toggle align-items-center rounded collapsed"
                data-vds-toggle="collapse"
                data-vds-target="#orders-collapse"
                aria-expanded="false"
              >
                Orders
              </button>
              <div className="collapse" id="orders-collapse">
                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                  <li>
                    <a href="#" className="link-dark rounded">
                      New
                    </a>
                  </li>
                  <li>
                    <a href="#" className="link-dark rounded">
                      Processed
                    </a>
                  </li>
                  <li>
                    <a href="#" className="link-dark rounded">
                      Shipped
                    </a>
                  </li>
                  <li>
                    <a href="#" className="link-dark rounded">
                      Returned
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li className="border-top my-3"></li>
          </ul>
        </div>
      </div>
      <div className="col-md-10">{<Outlet />}</div>
    </div>
  );
};
