import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import supabase from "../../connection";

const AdminPlayer = () => {
  const { playerId } = useParams();
  const [playerData, setPlayerData] = useState(null);
  const [loggedIn, setLoggedIn] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const { data, error } = await supabase
          .from("players")
          .select("*")
          .eq("player_id", playerId)
          .single();

        if (error) {
          throw error;
        }

        setPlayerData(data);
      } catch (error) {
        console.error("Error fetching player data:", error.message);
      }
    };

    fetchPlayerData();
  }, [playerId]);

  const handleLogout = () => {
    // Perform logout actions here (e.g., clear local storage, reset state)
    setLoggedIn(false);
    // Redirect to the login page
    navigate("/login");
  };

  if (!loggedIn) {
    // If not logged in, redirect to the login page
    navigate("/login");
    return null; // Prevent rendering anything else
  }

  return (
    <div>
      <div>
        <h2>Player Information</h2>
        <button onClick={handleLogout}>Logout</button>
        {playerData ? (
          <div>
            <p>Name: {playerData.player_name}</p>
            <p>Age: {playerData.age}</p>
            
          </div>
        ) : (
          <p>Loading player data...</p>
        )}
      </div>
    </div>
  );
};

export default AdminPlayer;
