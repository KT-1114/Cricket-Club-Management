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
          <PlayerNav curr={"details"} />
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
                    <span class="font-weight-bold">{playerData.player_name}</span>
                    <span class="text-black-50">edogaru@mail.com.my</span>
                    <span> </span>
                  </div>
                </div>
                <div class="col-md-5 border-right">
                  <div class="p-3 py-5">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                      <h4 class="text-right">Profile Settings</h4>
                    </div>
                    <div class="col-md-12">
                      <label class="labels">Name</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="name"
                        value={playerData.player_name}
                      />
                    </div>

                    <div class="row mt-3">
                      <div class="col-md-12">
                        <label class="labels">Mobile Number</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="enter phone number"
                          value=""
                        />
                      </div>
                      <div class="col-md-12">
                        <label class="labels">Email ID</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="enter email id"
                          value=""
                        />
                      </div>
                      <div class="col-md-12">
                        <label class="labels">Age</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Age"
                          value={playerData.age}
                        />
                      </div>
                      <div class="col-md-12">
                        <label class="labels">Joining Date</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Date"
                          value={playerData.joining_date}
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
                          value={playerData.city}
                          placeholder="state"
                        />
                      </div>
                    </div>
                    <div class="mt-5 text-center">
                      <button class="btn profile-button" type="button">
                        Save Profile
                      </button>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="p-3 py-5">
                    <div class="d-flex justify-content-between align-items-center experience">
                      <span>Edit Experience</span>
                      <span class="border px-3 p-1 add-experience">
                        <i class="fa fa-plus"></i>&nbsp;Experience
                      </span>
                    </div>
                    <br />
                    <div class="col-md-12">
                      <label class="labels">Experience in Designing</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="experience"
                        value=""
                      />
                    </div>{" "}
                    <br />
                    <div class="col-md-12">
                      <label class="labels">Additional Details</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="additional details"
                        value=""
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
