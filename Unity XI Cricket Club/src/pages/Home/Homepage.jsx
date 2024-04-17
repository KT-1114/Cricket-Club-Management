import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import "../Home/Homepage.css";
import CardList from "../../components/Card/card";
import Footer from "../../components/Footer/Footer";

const Homepage = () => {
  return (
    <div className="">
      <Header curr={"Home"} />
      <section className="pt-5 mt-5">
        <div class="container-fluid main px-4 px-lg-5 animate__animated animate__fadeInLeft">
          <div class="row gx-4 gx-lg-5 d-flex align-items-center">
            <div className="col-lg-5 images d-lg-block d-none"></div>
            <div class="col-lg-7">
              <h1 class="text-white">Unity XI Cricket Club</h1>
              <p className="text-white">
                Established in 2015, Unity XI Cricket Club has emerged as a
                vibrant hub for cricket enthusiasts in the local community.
                Founded on the principles of camaraderie, sportsmanship, and
                passion for the game, our club has become a cornerstone of
                cricketing excellence in the region.
              </p>
              <p className="text-white">
                <strong> Mission Statement: </strong>
                <br />
                Unity XI Cricket Club is committed to fostering a strong sense
                of unity and teamwork while promoting the values of fair play,
                dedication, and respect for the game. Through our inclusive and
                supportive environment, we aim to provide opportunities for
                players of all skill levels to develop and thrive in their
                cricketing journey.
              </p>
              <p className="text-white">
                <strong> Vision for the Future:</strong>
                <br />
                Looking ahead, Unity XI Cricket Club is committed to continuing
                its legacy of excellence and service to the community. We aspire
                to further expand our outreach programs, enhance our facilities,
                and cultivate a culture of continuous learning and improvement.
                With the unwavering support of our members, volunteers, and
                stakeholders, we are confident in our ability to make a lasting
                impact on the world of cricket and beyond.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div class="container-fluid achieve px-4 px-lg-5 animate__animated">
          <div class="row gx-4 gx-lg-5 d-flex align-items-center">
            <div className="victory col-lg-5">
              <img
                src="https://img.freepik.com/free-vector/cricket-championship-with-ball-wicket-cricket-stadium-freehand-sketch-graphic-design-vector-illustration_460848-11672.jpg?t=st=1711189528~exp=1711193128~hmac=44f7a1693b2b9caf33e95a11dabbe03431e9070b3a1ac10ffb59ca5ced26e898&w=900"
                alt=""
              />
            </div>
            <div class="col-lg-7">
              <div className="d-flex justify-content-between align-items-center">
                <h1 class="mt-5 text-dark">Recent Achievements</h1>
                <a href="/achievements" className="mt-5 explore">
                  Explore
                </a>
              </div>
              <p className="text-dark">
                Uniting Passion, Excellence, and Community. Our club is
                dedicated to fostering a love for cricket while promoting
                teamwork, skill development, and sportsmanship. Join us for
                thrilling matches, camaraderie, and the joy of playing the
                beloved sport of cricket.
              </p>
              <CardList />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Homepage;
