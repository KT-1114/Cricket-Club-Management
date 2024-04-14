import React from "react";
import Header from "../../components/Header/Header";
import "../Club/Club.css";
import Footer from "../../components/Footer/Footer";
import ClubDonutChart from "../../components/Charts/clubDonutChart";
import FetchAndRenderLineGraph from "../../components/Charts/clubPieChart";

const Club = () => {
  return (
    <div className="">
      <Header curr={"Club"} />
      <section className="pt-5">
        <div class="container-fluid main px-4 px-lg-5 animate__animated animate__fadeInLeft">
          <div class="row gx-4 gx-lg-5 d-flex align-items-center">
            <div className="col-lg-5 images d-lg-block d-none"></div>
            <div class="col-lg-7">
              <h1 class="text-white">Unity XI Cricket Club</h1>
              <p className="text-white">
                Unity XI Cricket Club, founded in 2015, is a vibrant hub for
                cricket enthusiasts, emphasizing camaraderie, sportsmanship, and
                passion. Our mission is to foster unity, teamwork, and fair play
                while providing opportunities for players of all skill levels to
                thrive. Looking forward, we aim to expand outreach, improve
                facilities, and foster a culture of continuous learning. With
                the support of our community, we're committed to making a
                lasting impact in cricket and beyond.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-fluid" style={{backgroundColor: "white"}}>
        <h1 className="text-center p-3">Statistics</h1>
        <ClubDonutChart className="p-3"/>
      </section>

    {/* <FetchAndRenderLineGraph/> */}

      <Footer/>
    </div>
  );
};

export default Club;
