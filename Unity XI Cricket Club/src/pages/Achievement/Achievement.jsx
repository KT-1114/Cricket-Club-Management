import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import supabase from "../../connection";
import "../Achievement/Achievements.css";
import Footer from "../../components/Footer/Footer";

const Achievement = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("achievements")
          .select("image_url, description, title, year")
          .order("year", { ascending: false });

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
      {loading ? ( // Conditionally render loading animation
        <div className="text-center loading-container mt-5">
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <div className="pt-5 mt-5">
            <Header curr={"Achievements"} />
            <section className="trophies">
              <h1 className="text-center mt-4">Achievements</h1>
            </section>
            <section class="pb-5 pt-2 trophies">
              <div class="container px-4 px-lg-5 pb-5 mt-5">
                <div class="row row-cols-1 row-cols-md-2 row-cols-lg-4 justify-content-center">
                  {cards.map((card, index) => (
                    <div class="col mb-4" key={index}>
                      <div class="card h-100">
                        <img
                          class="card-img-top"
                          src={card.image_url}
                          alt="..."
                        />
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
          <Footer />
        </>
      )}
    </div>
  );
};

export default Achievement;
