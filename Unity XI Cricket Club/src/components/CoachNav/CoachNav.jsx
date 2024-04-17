import React from "react";
import logo from "../../assets/logo.png";
import "../PlayerNav/PlayerNav.css";

const CoachNav = (props) => {
  console.log(props);
  return (
    <div>
      <nav
        class="navbar navbar-expand-lg navbar-dark fixed-top"
        style={{ marginBottom: "1%" }}
      >
        <div class="container">
          <div className="logoImage">
            <a className="navbar-brand animate__animated animate__fadeIn">
              <img src={logo} className="logo" />
            </a>
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
          <div
            class="collapse navbar-collapse animate__animated animate__fadeInRight"
            id="navbarSupportedContent"
          >
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a
                  className={
                    props.curr === "Dash" ? "nav-link active" : "nav-link"
                  }
                  aria-current="page"
                  href={"/admincoach/" + props.id}
                >
                  Dashboard
                </a>
              </li>
              <li class="nav-item">
                <a
                  class={
                    props.curr === "Players" ? "nav-link active" : "nav-link"
                  }
                  href={"/allplayers/" + props.id}
                >
                  Players
                </a>
              </li>
              <li class="nav-item">
                <a
                  class={
                    props.curr === "Matches" ? "nav-link active" : "nav-link"
                  }
                  href={"/allmatches/" + props.id}
                >
                  Matches
                </a>
              </li>
              <li class="nav-item">
                <a
                  class={
                    props.curr === "Login" ? "nav-link active" : "nav-link"
                  }
                  href="/login"
                  aria-disabled="true"
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default CoachNav;
