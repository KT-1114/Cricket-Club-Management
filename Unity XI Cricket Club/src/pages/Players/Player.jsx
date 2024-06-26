import React, { useEffect, useState } from "react";
import supabase from "../../connection";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const Player = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("players")
          .select(
            "player_name, photo, speciality, jersey_num, player_id, club_id"
          )
          .eq("club_id", 1)
          .order("speciality", { ascending: false });

        console.log(data);
        if (error) {
          throw error;
        }

        setCards(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="">
      {loading ? (
        <div className="text-center loading-container mt-5">
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <div className="pt-5 mt-5">
            <Header curr={"Players"} />
            <section className="trophies">
              <h1 className="text-center mt-4">Players</h1>
            </section>
            <section className="pb-5 pt-2 trophies">
              <div className="container px-4 px-lg-5 pb-5 mt-5">
                <div className="">
                  <h5 className="text-white">All Rounder</h5>
                </div>
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 justify-content-center">
                  {cards
                    .filter((card) => card.speciality === "all_rounder")
                    .map((card, index) => (
                      <div className=" col mb-4" key={index}>
                        <a href={"/allrounder/" + card.player_id}>
                          <div className="player card h-100">
                            <img
                              className="card-img-top"
                              src={card.photo}
                              alt="..."
                            />
                            <div className="card-body p-4">
                              <div className="text-center">
                                <h5 className="fw-bolder">
                                  {card.player_name}
                                </h5>
                              </div>
                            </div>
                          </div>
                        </a>
                      </div>
                    ))}
                </div>

                <div className="">
                  <h5 className="text-white">Batsman</h5>
                </div>
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 justify-content-center">
                  {cards
                    .filter((card) => card.speciality === "batsman")
                    .map((card, index) => (
                      <div className="col mb-4" key={index}>
                        <a href={"/batsman/" + card.player_id}>
                          <div className="player card h-100">
                            <img
                              className="card-img-top"
                              src={card.photo}
                              alt="..."
                            />
                            <div className="card-body p-4">
                              <div className="text-center">
                                <h5 className="fw-bolder">
                                  {card.player_name}
                                </h5>
                              </div>
                            </div>
                          </div>
                        </a>
                      </div>
                    ))}
                </div>

                <div className="">
                  <h5 className="text-white">Bowler</h5>
                </div>
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 justify-content-center">
                  {cards
                    .filter((card) => card.speciality === "bowler")
                    .map((card, index) => (
                      <div className="col mb-4" key={index}>
                        <a href={"/bowler/" + card.player_id}>
                          <div className="player card h-100">
                            <img
                              className="card-img-top"
                              src={card.photo}
                              alt="..."
                            />
                            <div className="card-body p-4">
                              <div className="text-center">
                                <h5 className="fw-bolder">
                                  {card.player_name}
                                </h5>
                              </div>
                            </div>
                          </div>
                        </a>
                      </div>
                    ))}
                </div>
              </div>
            </section>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default Player;
