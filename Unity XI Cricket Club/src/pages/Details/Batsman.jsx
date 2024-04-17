import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import supabase from "../../connection";

const Batsman = () => {
  const [playerData, setPlayerData] = useState(null);
  const { playerId } = useParams();

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const { data: playerData, error: playerError } = await supabase
          .from("players")
          .select("*")
          .eq("player_id", playerId)
          .single();

        if (playerError) {
          throw playerError;
        }

        const { data: batsmanData, error: batsmanError } =
          await supabase
            .from("batsmen")
            .select("*")
            .eq("player_id", playerId)
            .single();

        if (batsmanError) {
          throw batsmanError;
        }

        const combinedPlayerData = { ...playerData, ...batsmanData };

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
        <div className="allrounder">
          <Header />
          <section class="py-5">
            <div class="container px-4 px-lg-5 py-4 my-5 bg-white">
              <div class="row gx-4 gx-lg-5 align-items-center">
                <div class="col-md-6">
                  <img
                    class="card-img-top mb-5 mb-md-0"
                    src={playerData.photo}
                    alt="..."
                  />
                </div>
                <div class="col-md-6">
                  <div class="small mb-1">Batsman</div>
                  <h1 class="display-5 fw-bolder">{playerData.player_name}</h1>
                  <div class="fs-5 mb-5">
                    {/* <span class="text-decoration-line-through">$45.00</span> */}
                    <span>
                      Runs Scored -{" "}
                      {playerData.t20_runs +
                        playerData.odi_runs +
                        playerData.test_runs}
                    </span>
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
    </div>
  );
};

export default Batsman;
