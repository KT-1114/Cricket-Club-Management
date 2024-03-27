import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import supabase from "../../connection";
import "../Achievement/Achievements.css"

const Achievement = () => {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("achievements")
          .select("image_url, description, title")
          .order("year");

        console.log(data);
        if (error) {
          throw error;
        }

        setCards(data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header curr={"Achievements"} />
      <section className="trophies">
        <h1 className="text-center mt-4">Achievements</h1>
      </section>
      <section class="pb-5 pt-2 trophies">
        <div class="container px-4 px-lg-5 mt-5">
          <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 justify-content-center">
            {cards.map((card, index) => (
              <div class="col mb-4" key={index}>
                <div class="card h-100">
                  <img class="card-img-top" src={card.image_url} alt="..." />
                  <div class="card-body p-4">
                    <div class="text-center">
                      <h5 class="fw-bolder">{card.title}</h5>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Achievement;
