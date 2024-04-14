import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import supabase from "../../connection";
import PlayerNav from "../../components/PlayerNav/PlayerNav";
import Header from "../../components/Header/Header";
import "../AdminPlayer/AdminPlayer.css";
import DonutChart from "../../components/Charts/batsmanDonutChart";
import BowlerDonutChart from "../../components/Charts/bowlerDonutChart";
import AllRounderWicktesChart from "../../components/Charts/allRounderDonutChart";

const AdminPlayer = () => {
  const { playerId } = useParams();
  const [playerData, setPlayerData] = useState(null);
  const [playerStats, setPlayerStats] = useState(null);
  const [loggedIn, setLoggedIn] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const { data: playerData, error: playerError } = await supabase
          .from("players")
          .select("*")
          .eq("player_id", playerId)
          .single();

        setPlayerData(playerData);

        let specialtyData;
        if (playerData.speciality === "batsman") {
          const { data: batsmanData, error: batsmanError } = await supabase
            .from("batsmen")
            .select("*")
            .eq("player_id", playerId)
            .single();
          specialtyData = batsmanData;
          setPlayerStats(batsmanData);
        } else if (playerData.speciality === "bowler") {
          const { data: bowlerData, error: bowlerError } = await supabase
            .from("bowlers")
            .select("*")
            .eq("player_id", playerId)
            .single();
          specialtyData = bowlerData;
          setPlayerStats(bowlerData);
        } else if (playerData.speciality === "all_rounder") {
          const { data: allRounderData, error: allRounderError } =
            await supabase
              .from("all_rounders")
              .select("*")
              .eq("player_id", playerId)
              .single();
          setPlayerStats(allRounderData);
          specialtyData = allRounderData;
        }

        if (playerError) {
          throw playerError;
        }
      } catch (error) {
        console.error("Error fetching player data:", error.message);
      }
    };

    fetchPlayerData();
  }, [playerId]);

  const handleLogout = () => {
    setLoggedIn(false);
    navigate("/login");
  };

  if (!loggedIn) {
    navigate("/login");
    return null;
  }

  return (
    <div>
      {playerData && playerStats ? (
        <div className="">
          <PlayerNav curr={"Dash"} id={playerId} />

          <div className="cards container pt-5 mb-5">
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
                          {playerData.speciality === "bowler"
                            ? "Overs"
                            : "Matches played"}
                        </div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800 text-center">
                          {playerData.speciality === "bowler"
                            ? playerStats.overs_thrown
                            : playerStats.matches_played}
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
                          {playerData.speciality === "bowler"
                            ? "Wickets"
                            : "Runs"}
                        </div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800 text-center">
                          {playerData.speciality === "bowler"
                            ? playerStats.t20_wickets +
                              playerStats.test_wickets +
                              playerStats.odi_wickets
                            : playerStats.t20_runs +
                              playerStats.test_runs +
                              playerStats.odi_runs}
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
                          {playerData.speciality === "bowler"
                            ? "Economy"
                            : "Centuries"}
                        </div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800 text-center">
                          {playerData.speciality === "bowler"
                            ? playerStats.economy
                            : playerStats.centuries}
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
                          {playerData.speciality === "bowler"
                            ? "ODI Wickets"
                            : "ODI Runs"}
                        </div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800 text-center">
                          {playerData.speciality === "bowler"
                            ? playerStats.odi_wickets
                            : playerStats.odi_runs}
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
                          {playerData.speciality === "bowler"
                            ? "Test Wickets"
                            : "Test Runs"}
                        </div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800 text-center">
                          {playerData.speciality === "bowler"
                            ? playerStats.test_wickets
                            : playerStats.test_runs}
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
                          {playerData.speciality === "bowler"
                            ? "T20 Wickets"
                            : "T20 Runs"}
                        </div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800 text-center">
                          {playerData.speciality === "bowler"
                            ? playerStats.t20_wickets
                            : playerStats.t20_runs}
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
                          class="text-xs font-weight-bold text-primary mb-1  text-center"
                          style={{ fontSize: "1.4rem" }}
                        >
                          {playerData.speciality === "bowler"
                            ? "Bowling Style"
                            : "Batting Style"}
                        </div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800 text-center">
                          {playerData.speciality === "bowler"
                            ? playerStats.bowling_style === true
                              ? "Right"
                              : "Left"
                            : playerStats.batting_side === true
                            ? "Right"
                            : "Left"}
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
                          {playerData.speciality === "bowler"
                            ? "Runs"
                            : "Fifties"}
                        </div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800 text-center">
                          {playerData.speciality === "bowler"
                            ? playerStats.runs_scored
                            : playerStats.fifties}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section
            className="container mb-5"
            style={{ backgroundColor: "white", borderRadius: "10px" }}
          >
            {playerData.speciality === "batsman" ||
            playerData.speciality === "bowler" ? (
              <div className="row">
                <div className="col-xl-6 col-md-12">
                  {playerData.speciality === "batsman" ? (
                    <DonutChart id={playerId} />
                  ) : (
                    <BowlerDonutChart id={playerId} />
                  )}
                </div>
              </div>
            ) : (
              <AllRounderWicktesChart id={playerId} />
            )}
          </section>

          {/* {playerData.speciality === "all_rounder" ? (
            <div className="">
            </div>
          ) : (
            ""
          )} */}

          {/* <div class="page-content page-container" id="page-content" >
            <div class="padding">
              <div class="row container d-flex justify-content-center">
                <div class="col-xl-6 col-md-12">
                  <div class="card user-card-full">
                    <div class="row m-l-0 m-r-0">
                      <div class="col-sm-4 bg-c-lite-green user-profile">
                        <div class="card-block text-center text-white">
                          <div class="m-b-25">
                            <img
                              src={playerData.photo}
                              class="img-radius w-50"
                              alt="User-Profile-Image"
                            />
                          </div>
                          <h4 class="f-w-600">{playerData.player_name}</h4>
                          <p>{playerData.speciality === "batsman"? ("Batsman") : playerData.speciality === "bowler"? ("Bowler") : ("All Rounder")}</p>
                          <i class=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                        </div>
                      </div>
                      <div class="col-sm-8">
                        <div class="card-block">
                          <h6 class="m-b-20 p-b-5 b-b-default f-w-600">
                            Information
                          </h6>
                          <div class="row">
                            <div class="col-sm-6">
                              <p class="m-b-10 f-w-600">Email</p>
                              <h6 class="text-muted f-w-400">
                                rntng@gmail.com
                              </h6>
                            </div>
                            <div class="col-sm-6">
                              <p class="m-b-10 f-w-600">Phone</p>
                              <h6 class="text-muted f-w-400">98979989898</h6>
                            </div>
                          </div>
                          <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                            Projects
                          </h6>
                          <div class="row">
                            <div class="col-sm-6">
                              <p class="m-b-10 f-w-600">Recent</p>
                              <h6 class="text-muted f-w-400">Sam Disuja</h6>
                            </div>
                            <div class="col-sm-6">
                              <p class="m-b-10 f-w-600">Most Viewed</p>
                              <h6 class="text-muted f-w-400">
                                Dinoter husainm
                              </h6>
                            </div>
                          </div>
                          <ul class="social-link list-unstyled m-t-40 m-b-10">
                            <li>
                              <a
                                href="#!"
                                data-toggle="tooltip"
                                data-placement="bottom"
                                title=""
                                data-original-title="facebook"
                                data-abc="true"
                              >
                                <i
                                  class="mdi mdi-facebook feather icon-facebook facebook"
                                  aria-hidden="true"
                                ></i>
                              </a>
                            </li>
                            <li>
                              <a
                                href="#!"
                                data-toggle="tooltip"
                                data-placement="bottom"
                                title=""
                                data-original-title="twitter"
                                data-abc="true"
                              >
                                <i
                                  class="mdi mdi-twitter feather icon-twitter twitter"
                                  aria-hidden="true"
                                ></i>
                              </a>
                            </li>
                            <li>
                              <a
                                href="#!"
                                data-toggle="tooltip"
                                data-placement="bottom"
                                title=""
                                data-original-title="instagram"
                                data-abc="true"
                              >
                                <i
                                  class="mdi mdi-instagram feather icon-instagram instagram"
                                  aria-hidden="true"
                                ></i>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      ) : (
        <div className="text-center loading-container mt-5">
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
};

export default AdminPlayer;
