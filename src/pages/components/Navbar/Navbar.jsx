import React from "react";
import "./Navbar.css";
import { BiMenuAltRight } from "react-icons/bi";
import { NavLink } from "react-router-dom";

export default function Navbar({ is_client = false }) {
  if (is_client) {
    return (
      <nav className="navbar navbar-expand-lg fixed-top bg-body-tertiary p-md-4 px-3 pt-4 ">
        <div className="container-fluid d-flex justify-content-center align-items-center">
          <a
            className="navbar-brand d-flex  justify-content-center align-items-center gap-4"
            href="#"
          >
            <img
              src="/imgs/cookie_logo.jpeg"
              height={"40"}
              style={{ border: "3px solid black" }}
              alt=""
            />
            <h2 className="text-start">Sign Agreement</h2>
          </a>
        </div>
      </nav>
    );
  }

  return (
    <nav className="navbar navbar-expand-lg fixed-top bg-body-tertiary p-md-4 px-3 pt-4">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img
            src="/imgs/cookie_logo.jpeg"
            height="40"
            style={{ border: "3px solid black" }}
            alt=""
          />
        </a>
        <button
          className="navbar-toggler"
          style={{
            fontSize: "40px",
            color: "black",
            border: "none",
            borderRadius: "50%",
            outline: "none",
            boxShadow: "none",
          }}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <BiMenuAltRight />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto d-flex gap-4">
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin">
                <h3>Generate Agreement Link</h3>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/upload-template">
                <h3>Update template</h3>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/clients">
                <h3>Clients</h3>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/admin">
                <h3>Customize website</h3>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
