import React from "react";
import "../Header/Header.css"
import logo from "../../assets/logo.png"

const Header = () => {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark fixed-bottom d-sm-block d-none">
        <div class="container">
          <a href="/" className="navbar-brand animate__animated animate__fadeIn"><img src={logo} className="logo"/></a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
          <i class="bi bi-list"></i>
          </button>
          <div class="collapse navbar-collapse animate__animated animate__fadeInRight" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Achievements
                </a>
              </li>
              {/* <li class="nav-item">
                <a class="nav-link" href="#">
                  Statistics
                </a>
              </li> */}
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Players
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Club
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="" aria-disabled="true">
                  Login
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <nav class="navbar navbar-expand-lg navbar-dark d-block d-sm-none">
        <div class="container">
          <a href="/" className="navbar-brand animate__animated animate__fadeIn"><img src={logo} className="logo"/></a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
          <i class="bi bi-list"></i>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Achievements
                </a>
              </li>
              {/* <li class="nav-item">
                <a class="nav-link" href="#">
                  Statistics
                </a>
              </li> */}
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Players
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Club
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="" aria-disabled="true">
                  Login
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
