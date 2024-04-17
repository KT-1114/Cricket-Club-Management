import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import supabase from "../../connection";
import PlayerNav from "../../components/PlayerNav/PlayerNav";
import Header from "../../components/Header/Header";
import DonutChart from "../../components/Charts/batsmanDonutChart";
import BowlerDonutChart from "../../components/Charts/bowlerDonutChart";
import AllRounderWicktesChart from "../../components/Charts/allRounderDonutChart";
import ClubDonutChart from "../../components/Charts/clubDonutChart";
import CoachNav from "../../components/CoachNav/CoachNav";

const AdminCoach = () => {
  const { coachId } = useParams();
  const [coachData, setPlayerData] = useState(null);
  const [loggedIn, setLoggedIn] = useState(true);
  const navigate = useNavigate();
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

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const { data: coachData, error: playerError } = await supabase
          .from("coaches")
          .select("*")
          .eq("coach_id", coachId)
          .single();

        setPlayerData(coachData);

        if (playerError) {
          throw playerError;
        }
      } catch (error) {
        console.error("Error fetching player data:", error.message);
      }
    };

    fetchPlayerData();
  }, [coachId]);

  const handleLogout = () => {
    setLoggedIn(false);
    navigate("/coachlogin");
  };

  if (!loggedIn) {
    navigate("/coachlogin");
    return null;
  }

  return (
    <div>
      {coachData ? (
        <div className="">
          <CoachNav curr={"Dash"} id={coachId}/>

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
                          Speciality
                        </div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800 text-center">
                          {coachData.speciality}
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
                          Experience
                        </div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800 text-center">
                          {coachData.experience}
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
                          Joining Date
                        </div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800 text-center">
                          {coachData.joining_date}
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
                          Salary
                        </div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800 text-center">
                          {coachData.salary}
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
                          Batsman
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
                          Bowlers
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
                          class="text-xs font-weight-bold text-primary mb-1  text-center"
                          style={{ fontSize: "1.4rem" }}
                        >
                          All Rounders
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

            <section className="" style={{backgroundColor:"white", borderRadius:"10px"}}>
            <ClubDonutChart/>
            </section>
          </div>
        </div>
      ) : (
        <div className="text-center loading-container mt-5">
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
};

export default AdminCoach;
