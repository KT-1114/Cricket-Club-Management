import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import supabase from "../../connection";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const PlayerDetails = () => {
  const [playerData, setPlayerData] = useState(null);
  const { playerId } = useParams();

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        // Fetch player data from the 'players' table
        const { data: playerData, error: playerError } = await supabase
          .from("players")
          .select("*")
          .eq("player_id", playerId)
          .single();

        if (playerError) {
          throw playerError;
        }

        // Fetch batsmen data from the 'batsmen' table
        const { data: all_rounderData, error: all_rounderError } = await supabase
          .from("all_rounders")
          .select("*")
          .eq("player_id", playerId)
          .single();

        if (all_rounderError) {
          throw all_rounderError;
        }

        // Merge playerData and all_rounderData to create combined playerData
        const combinedPlayerData = { ...playerData, ...all_rounderData };

        setPlayerData(combinedPlayerData);
      } catch (error) {
        console.error("Error fetching player data:", error.message);
      }
    };
    fetchPlayerData();
  }, [playerId]);

  return (
    <div>
      {playerData ? (
        <div className="">
          <Header />
          <section class="py-5">
            <div class="container px-4 px-lg-5 my-5">
              <div class="row gx-4 gx-lg-5 align-items-center">
                <div class="col-md-6">
                  <img
                    class="card-img-top mb-5 mb-md-0"
                    src={playerData.photo}
                    alt="..."
                  />
                </div>
                <div class="col-md-6">
                  <div class="small mb-1">{playerData.speciality}</div>
                  <h1 class="display-5 fw-bolder">{playerData.player_name}</h1>
                  <div class="fs-5 mb-5">
                    {/* <span class="text-decoration-line-through">$45.00</span> */}
                    <span>Runs Scored - {playerData.t20_runs + playerData.odi_runs + playerData.test_runs}</span>
                    <br />
                    <span>T20 Runs - {playerData.t20_runs}</span>
                    <br />
                    <span>ODI Runs - {playerData.odi_runs}</span>
                    <br />
                    <span>Test Runs - {playerData.test_runs}</span>
                    <br />
                    <span>Centuries - {playerData.centuries}</span>
                    <br />
                    <span>Fifties - {playerData.fifties}</span>
                    <br />
                    {/* <span>Run Scored - {playerData.run_scored}</span><br/>
                  <span>Run Scored - {playerData.run_scored}</span><br/>
                  <span>Run Scored - {playerData.run_scored}</span> */}
                  </div>
                </div>
              </div>
            </div>
          </section>
          <Footer />
        </div>
      ) : (
        <div className="text-center loading-container mt-5">
          <p>Loading...</p>
        </div>
      )}
      {/* <div>
        <h2>Player Information</h2>
        {playerData ? (
          <div>
            <p>Name: {playerData.player_name}</p>
            <p>Age: {playerData.age}</p>
            <p>Run Scored: {playerData.run_scored}</p>
          </div>
        ) : (
          <p>Loading player data...</p>
        )}
      </div> */}
    </div>
  );
};

export default PlayerDetails;
