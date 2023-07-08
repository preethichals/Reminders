import React from "react";

import { Link } from "react-router-dom";


function Navbar() {

  let name = window.localStorage.getItem("username")

  return (
    <>
      <nav
        className="navbar navbar-expand-lg mynav fixed-top bg-black"
        style={{ position: "sticky" }}
      >
        <div className="container-fluid">

          <a className="navbar-brand " href="!#" id="top">
            <span id="Content">Personal </span>
            <span className="fs-2">Reminders</span>
          </a>

          <button
            className="navbar-toggler"
            id="navBut"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon "></span>
          </button>

          <div
            className="collapse navbar-collapse bg-black justify-content-end"
            id="navbarNav"
          >

            <ul className="navbar-nav justify-content-center align-items-center">
              <li className="nav-item letter-spacing1 text-uppercase ">
                <a className="nav-link active" aria-current="page" href="/portal/home">
                  Home
                </a>
              </li>
              <li className="nav-item letter-spacing1">
                <a className="nav-link" href="/portal/create">
                  +Note
                </a>
              </li>


              <li className="nav-item dropdown">
                <img
                  src="https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png"
                  className=" nav-link dropdown-toggle rounded-circle"
                  style={{ height: '3rem', width: '3rem' }}
                  alt="Black and White Portrait of a Man"
                  loading="lazy"

                  id="navbarDarkDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                />

                <ul
                  className="dropdown-menu bg-black dropdown-menu-dark"
                  aria-labelledby="navbarDarkDropdownMenuLink"
                >
                  <li>
                    <Link className="dropdown-item p-2" to="/portal/profile">
                      {name}
                    </Link>
                  </li>
                  <li>
                    <a className="dropdown-item p-2" href="/">
                      LOG OUT
                    </a>
                  </li>
                </ul>
              </li>
            </ul>

          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
