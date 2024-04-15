import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import "../Club/Club.css";
import Footer from "../../components/Footer/Footer";
import ClubDonutChart from "../../components/Charts/clubDonutChart";
import supabase from "../../connection";

const Club = () => {
  const [cards, setCards] = useState([]);
  const [PlayerNamesCount, setPlayerNamesCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [totalBatsmen, setTotalBatsmen] = useState(0);
  const [totalBowlers, setTotalBowlers] = useState(0);
  const [totalAllRounders, setTotalAllRounders] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: playersData, error } = await supabase
          .from("players")
          .select("*")
          .eq("club_id", 1);

        if (error) {
          throw error;
        }

        setCards(playersData);

        let batsmenCount = 0;
        let bowlersCount = 0;
        let allRoundersCount = 0;

        playersData.forEach((player) => {
          if (player.speciality === "batsman") {
            batsmenCount++;
            setTotalBatsmen(batsmenCount);
          } else if (player.speciality === "bowler") {
            bowlersCount++;
            setTotalBowlers(bowlersCount);
          } else if (player.speciality === "all_rounder") {
            allRoundersCount++;
            setTotalAllRounders(allRoundersCount);
          }
        });

        const uniquePlayerNamesCount = playersData.reduce((count, player) => {
          return (
            count +
            (count === 0 ||
            !cards.some((card) => card.player_name === player.player_name)
              ? 1
              : 0)
          );
        }, 0);

        setPlayerNamesCount(uniquePlayerNamesCount);

        setLoading(false);

        console.log("Unique Player Names Count:", uniquePlayerNamesCount);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="">
      <Header curr={"Club"} />
      <section className="pt-5">
        <div class="container-fluid main px-4 px-lg-5 animate__animated animate__fadeInLeft">
          <div class="row gx-4 gx-lg-5 d-flex align-items-center">
            <div className="col-lg-5 images2 d-lg-block d-none"></div>
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

      <section className="container-fluid" style={{ backgroundColor: "white" }}>
        <h1 className="text-center pt-3">Statistics</h1>
        <section>
          <div className="">
            <div className="mt-5 mb-5">
              <div className="row">
                <div class="col-xl-3 col-md-6 mb-4">
                  <div class="card border-left-primary shadow h-100">
                    <div class="card-body">
                      <div class="d-flex justify-content-center align-items-center">
                        <div>
                          <div
                            class="text-xs font-weight-bold text-primary mb-1"
                            style={{ fontSize: "1.4rem" }}
                          >
                            Total Players
                          </div>
                          <div class="h5 mb-0 font-weight-bold text-gray-800 text-center">
                            {PlayerNamesCount}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-xl-3 col-md-6 mb-4">
                  <div class="card border-left-primary shadow h-100">
                    <div class="card-body">
                      <div class="d-flex justify-content-center align-items-center">
                        <div>
                          <div
                            class="text-xs font-weight-bold text-primary mb-1"
                            style={{ fontSize: "1.4rem" }}
                          >
                            Total Batsmen
                          </div>
                          <div class="h5 mb-0 font-weight-bold text-gray-800 text-center">
                            {totalBatsmen}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-xl-3 col-md-6 mb-4">
                  <div class="card border-left-primary shadow h-100">
                    <div class="card-body">
                      <div class="d-flex justify-content-center align-items-center">
                        <div>
                          <div
                            class="text-xs font-weight-bold text-primary mb-1"
                            style={{ fontSize: "1.4rem" }}
                          >
                            Total Bowlers
                          </div>
                          <div class="h5 mb-0 font-weight-bold text-gray-800 text-center">
                            {totalBowlers}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-xl-3 col-md-6 mb-4">
                  <div class="card border-left-primary shadow h-100">
                    <div class="card-body">
                      <div class="d-flex justify-content-center align-items-center">
                        <div>
                          <div
                            class="text-xs font-weight-bold text-primary mb-1"
                            style={{ fontSize: "1.4rem" }}
                          >
                            Total All Rounders
                          </div>
                          <div class="h5 mb-0 font-weight-bold text-gray-800 text-center">
                            {totalAllRounders}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <ClubDonutChart className="p-3" />
      </section>

      {/* <FetchAndRenderLineGraph/> */}

      <Footer />
    </div>
  );
};

export default Club;
