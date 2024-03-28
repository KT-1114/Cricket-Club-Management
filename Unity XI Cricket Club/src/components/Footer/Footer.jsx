import React from "react";
import "../Footer/Footer.css";

const Footer = () => {
  return (
    <div>
      <section class="footer">
        <footer class="">
          <div class="container-fluid p-4">
            <div class="row">
              <div class="col-lg-6 col-md-12 mb-4 mb-md-0">
                <h5 class="text-uppercase">Unity XI Cricket Club</h5>
                <p>
                Established in 2015, Unity XI Cricket Club has emerged as a
                vibrant hub for cricket enthusiasts in the local community.
                Founded on the principles of camaraderie, sportsmanship, and
                passion for the game, our club has become a cornerstone of
                cricketing excellence in the region.
                </p>
              </div>

              <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h5 class="text-uppercase">explore</h5>

                <ul class="list-unstyled mb-0">
                  <li>
                    <a href="/achievements" class="">
                      Achievements
                    </a>
                  </li>
                  <li>
                    <a href="" class="">
                      Players
                    </a>
                  </li>
                  <li>
                    <a href="" class="">
                      Club
                    </a>
                  </li>
                  {/* <li>
                    <a href="#!" class="">
                      
                    </a>
                  </li> */}
                </ul>
              </div>

              <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h5 class="text-uppercase mb-0">Login</h5>

                <ul class="list-unstyled">
                  <li>
                    <a href="/login" class="">
                      Player
                    </a>
                  </li>
                  <li>
                    <a href="#!" class="">
                      Coach
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div
            class="text-center p-3"
            style={{ backgroundColor: "rgba(0,0,0,0.05)" }}
          >
            © 2015 Copyright: &nbsp;
            <a class="text-light text-decoration-underline" href="https://unityxi.netlify.app">
              unityxi.netlify.app
            </a>
          </div>
        </footer>
      </section>
    </div>
  );
};

export default Footer;
