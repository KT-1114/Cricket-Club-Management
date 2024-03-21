import React from "react";
import Header from "../../components/Header/Header";
import "../Home/Homepage.css";

const Homepage = () => {
  return (
    <div>
      <Header />
      <section>
        <div class="container-fluid main px-4 px-lg-5 animate__animated animate__fadeInLeft">
          <div class="row gx-4 gx-lg-5">
            <div class="col-lg-7">
              <h1 class="mt-5 text-white">Unity XI Cricket Club</h1>
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
          <div class="row gx-4 gx-lg-5">
            <div class="col-lg-7">
              <h1 class="mt-5 text-dark">Recent Achievement</h1>
              <p className="text-dark">
                Uniting Passion, Excellence, and Community. Our club is
                dedicated to fostering a love for cricket while promoting
                teamwork, skill development, and sportsmanship. Join us for
                thrilling matches, camaraderie, and the joy of playing the
                beloved sport of cricket.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
