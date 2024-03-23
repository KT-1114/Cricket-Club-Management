// src/components/CardList.js
import React, { useState, useEffect } from "react";
import supabase from "../../connection";
import "../Card/card.css"

const CardList = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("achievements")
          .select("image_url, description, title").order("title") ;

        console.log(data)
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
    <div className="card-list row row-cols-1 row-cols-md-3 g-4">
    {cards.map((card, index) => (
      <div className="col" key={index}>
        <div className="card h-100">
          <img
            src={card.image_url}
            className="card-img-top img-fluid"
            alt={`Card ${index}`}
            style={{ maxHeight: "500px", objectFit: "cover" }} // Adjust the max height to your preference
          />
          <div className="card-body">
            <h5 className="card-title">{card.title}</h5>
            {/* <p className="card-text">{card.description}</p> */}
          </div>
        </div>
      </div>
    ))}
  </div>
  );
};

export default CardList;
