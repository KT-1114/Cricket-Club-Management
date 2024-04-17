import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import supabase from "../../connection";

const Trophies = () => {
  const [playerData, setPlayerData] = useState(null);
  const { Id } = useParams();

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const { data: all_rounderData, error: all_rounderError } =
          await supabase.from("achievements").select("*").eq("id", Id).single();

        if (all_rounderError) {
          throw all_rounderError;
        }

        setPlayerData(all_rounderData);
      } catch (error) {
        console.error("Error fetching player data:", error.message);
      }
    };
    fetchPlayerData();
  }, [Id]);
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
                    src={playerData.image_url}
                    alt="..."
                  />
                </div>
                <div class="col-md-6">
                  <div class="small mb-1">{playerData.year}</div>
                  <h1 class="display-5 fw-bolder">{playerData.title}</h1>
                  <div class="fs-5 mb-5">
                    <p>{playerData.description}</p>
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

export default Trophies;
