import React from "react";
import "../Header/Header.css"
import logo from "../../assets/logo.png"

const Header = (props) => {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
        <div class="container">
          <div className="logoImage">
          <a href="/" className="navbar-brand animate__animated animate__fadeIn"><img src={logo} className="logo"/></a>
          </div>
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
                <a className={props.curr === "Home" ? "nav-link active" : "nav-link"}  aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li class="nav-item">
                <a class={props.curr === "Achievements" ? "nav-link active" : "nav-link"} href="/achievements">
                  Achievements
                </a>
              </li>
              <li class="nav-item">
                <a class={props.curr === "Matches" ? "nav-link active" : "nav-link"} href="/matches">
                  Matches
                </a>
              </li>
              <li class="nav-item">
                <a class={props.curr === "Players" ? "nav-link active" : "nav-link"} href="/players">
                  Players
                </a>
              </li>
              <li class="nav-item">
                <a class={props.curr === "Club" ? "nav-link active" : "nav-link"} href="/club">
                  Club
                </a>
              </li>
              <li class="nav-item">
                <a class={props.curr === "Login" ? "nav-link active" : "nav-link"} href="/login" aria-disabled="true">
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
