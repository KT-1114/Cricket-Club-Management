import React, { useEffect, useState } from "react";
import PlayerNav from "../../components/PlayerNav/PlayerNav";
import { useNavigate, useParams } from "react-router-dom";
import supabase from "../../connection";

const Details = () => {
  const { playerId } = useParams();
  const [playerData, setPlayerData] = useState(null);
  const [playerStats, setPlayerStats] = useState(null);
  const [loggedIn, setLoggedIn] = useState(true);
  const navigate = useNavigate();
  const [editedPlayerData, setEditedPlayerData] = useState(null);

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

  function handleInputChange(event) {
    const { name, value } = event.target;
    if (name === "contact") {
      if (value.length <= 10 || value.length === 0) {
        setEditedPlayerData({
          ...editedPlayerData,
          [name]: value,
        });
      } else {
        event.target.value = "";
        setEditedPlayerData({
          ...editedPlayerData,
          [name]: "",
        });
        alert(
          "Please provide a correct 10-digit mobile number or leave it empty."
        );
      }
    } else {
      setEditedPlayerData({
        ...editedPlayerData,
        [name]: value,
      });
    }
  }

  const saveProfile = async () => {
    try {
      const { error } = await supabase
        .from("players")
        .update(editedPlayerData)
        .eq("player_id", playerId);

      console.log(editedPlayerData);
      if (error) {
        throw error;
      }

      setPlayerData({ ...editedPlayerData });
      alert("Successfully upadated profile.");
      navigate("/adminplayer/" + playerId);
    } catch (error) {
      console.error("Error updating player data:", error.message);
    }
  };

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
          <PlayerNav curr={"details"} id={playerId} />
          <div className="mt-5 pt-5">
            <div class="container rounded bg-white mt-5 mb-5">
              <div class="row">
                <div class="col-md-3 border-right">
                  <div class="d-flex flex-column align-items-center text-center p-3 py-5">
                    <img
                      class="rounded-circle mt-5"
                      width="150px"
                      src={playerData.photo}
                    />
                    <span class="font-weight-bold">
                      {playerData.player_name}
                    </span>
                    <span class="text-black-50">{playerData.email}</span>
                    <span> </span>
                  </div>
                </div>
                <div class="col-md-5 border-right">
                  <div class="p-3 py-5">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                      <h4 class="text-right">Profile Settings</h4>
                    </div>
                    <div class="col-md-12 py-1">
                      <label class="labels">Name</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder={playerData.player_name}
                        name="player_name"
                        onChange={handleInputChange}
                      />
                    </div>

                    <div class="row mt-3">
                      <div class="col-md-12 py-1">
                        <label class="labels">Mobile Number</label>
                        <input
                          type="text"
                          class="form-control"
                          name="contact"
                          placeholder={playerData.contact}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div class="col-md-12 py-1">
                        <label class="labels">Email ID</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder={playerData.email}
                          onChange={handleInputChange}
                          name="email"
                        />
                      </div>
                      <div class="col-md-12 py-1">
                        <label class="labels">Age</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder={playerData.age}
                          name="age"
                          onChange={handleInputChange}
                        />
                      </div>
                      <div class="col-md-12 py-1">
                        <label class="labels">Joining Date</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder={playerData.joining_date}
                          name="joining_date"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div class="row mt-3">
                      <div class="col-md-6">
                        <label class="labels">Country</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="country"
                          value="India"
                        />
                      </div>
                      <div class="col-md-6">
                        <label class="labels">State/Region</label>
                        <input
                          type="text"
                          class="form-control"
                          name="city"
                          onChange={handleInputChange}
                          placeholder={playerData.city}
                        />
                      </div>
                    </div>
                    <div class="mt-5 text-center">
                      <button
                        class="btn btn-outline-primary profile-button"
                        type="button"
                        onClick={saveProfile}
                      >
                        Save Profile
                      </button>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="p-3 py-5">
                    <div class="d-flex justify-content-between align-items-center experience">
                      <span>Club Details</span>
                    </div>
                    <br />
                    <div class="col-md-12">
                      <label class="labels">Jersey Number</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="experience"
                        value={playerData.jersey_num}
                      />
                    </div>{" "}
                    <br />
                    <div class="col-md-12">
                      <label class="labels">Total matches</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="additional details"
                        value={
                          playerData.odi_played +
                          playerData.test_played +
                          playerData.t20_played
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
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

export default Details;
