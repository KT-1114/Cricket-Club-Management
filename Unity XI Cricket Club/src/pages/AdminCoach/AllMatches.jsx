import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "../Matches/Matches.css";
import CoachNav from "../../components/CoachNav/CoachNav";
import supabase from "../../connection";
import { useParams } from "react-router-dom";

const AllMatches = (props) => {
  const { coachId } = useParams();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newMatches, setnewMatches] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isTeamDialogOpen, setTeamIsDialogOpen] = useState(false);
  const [players, setPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [newTeam, setNewTeam] = useState({
    team_name: "",
    type: "",
    players: [],
  });
  const [newMatchDetails, setNewMatchDetails] = useState({
    venue: "",
    date: "",
    team2: "",
    team1: "Unity XI",
  });

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const { data, error } = await supabase.from("players").select("*");
        if (error) {
          throw error;
        }
        setPlayers(data);
      } catch (error) {
        console.error("Error fetching players:", error.message);
      }
    };

    fetchPlayers();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("matches")
          .select("*")
          .order("date_time", { ascending: false });

        console.log(data);
        if (error) {
          throw error;
        }
        setMatches(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("scheduled_matches")
          .select("*")
          .order("date", { ascending: true });

        console.log(data);
        if (error) {
          throw error;
        }
        setnewMatches(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDeleteMatch = async (matchId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this match?"
    );
    if (confirmDelete) {
      try {
        const { error } = await supabase
          .from("scheduled_matches")
          .delete()
          .eq("sc_match_id", matchId);
        if (error) {
          throw error;
        }
        const { data: updatedMatches } = await supabase
          .from("scheduled_matches")
          .select("*")
          .order("date", { ascending: true });
        setnewMatches(updatedMatches);
      } catch (error) {
        console.error("Error deleting match:", error.message);
      }
    }
  };

  const handleAddTeam = async () => {
    try {
      if(selectedPlayers.length >=15){
        const { data, error } = await supabase.from("team").insert([newTeam]);
        if (error) {
          throw error;
        }
  
        setTeamIsDialogOpen(false);
        setNewTeam({
          team_name: "",
          type: "",
          players: [],
        });
  
        alert("Team created successfully.");
      }else{
        alert("Number of players must be at least 15.")
        setTeamIsDialogOpen(false);
        setNewTeam({
          team_name: "",
          type: "",
          players: [],
        });
      }


    } catch (error) {}
  };

  const handleAddMatch = async () => {
    try {
      const now = new Date();
      const selectedDateTime = new Date(newMatchDetails.date);
      if (selectedDateTime <= now) {
        alert(
          "Match date and time must be greater than the current date and time."
        );
        return;
      }
      const date = new Date(newMatchDetails.date).toISOString();
      const newMatch = { ...newMatchDetails, date };

      const { data, error } = await supabase
        .from("scheduled_matches")
        .insert([newMatch]);
      if (error) {
        throw error;
      }
      setIsDialogOpen(false);
      setNewMatchDetails({
        venue: "",
        date: "",
        team2: "",
      });
      const { data: updatedMatches } = await supabase
        .from("scheduled_matches")
        .select("*")
        .order("date", { ascending: true });
      setnewMatches(updatedMatches);
    } catch (error) {
      console.error("Error adding match:", error.message);
    }
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleTeamDialogClose = () => {
    setTeamIsDialogOpen(false);
  };

  return (
    <div className="">
      {!loading ? (
        <div className="matches">
          <div className="container mt-5 pt-5">
            <CoachNav curr={"Matches"} id={coachId} />
            <div className="d-flex py-2 justify-content-between">
              <h1 className="text-white">Upcoming Matches</h1>
              <div className="">
                <button
                  className="btn btn-outline-warning text-dark bg-warning"
                  onClick={() => setIsDialogOpen(true)}
                >
                  <i class="bi bi-plus-lg"></i> Add Match
                </button>{" "}
                &nbsp;
                <button
                  className="btn btn-outline-warning text-dark bg-warning"
                  onClick={() => setTeamIsDialogOpen(true)}
                >
                  <i class="bi bi-plus-lg"></i> Create Team
                </button>
              </div>
            </div>
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Venue</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Opponent Team</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {newMatches.map((newMatches) => (
                    <tr key={newMatches.sc_match_id}>
                      <td>{newMatches.venue}</td>
                      <td>{formatDate(newMatches.date)}</td>
                      <td>{formatTime(newMatches.date)}</td>
                      <td>{newMatches.team2}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm"
                          onClick={() =>
                            handleDeleteMatch(newMatches.sc_match_id)
                          }
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="container mt-5">
            <CoachNav curr={"Matches"} id={coachId} />
            <h1 className="text-white">Previous Matches</h1>
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Venue</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Opponent Team</th>
                    <th>Winner</th>
                    <th>Man of the Match</th>
                    <th>Type</th>
                  </tr>
                </thead>
                <tbody>
                  {matches.map((match) => (
                    <tr
                      key={match.match_id}
                      className={
                        match.winners === true
                          ? "table-success"
                          : "table-danger"
                      }
                    >
                      <td>{match.venue}</td>
                      <td>{formatDate(match.date_time)}</td>
                      <td>{formatTime(match.date_time)}</td>
                      <td>{match.team2}</td>
                      <td>
                        {match.winners === true ? match.team1 : match.team2}
                      </td>
                      <td>{match.winners === true ? match.motm : "-"}</td>
                      <td>{match.type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Footer />
        </div>
      ) : (
        <div className="text-center loading-container mt-5">
          <p>Loading...</p>
        </div>
      )}

      {isDialogOpen && (
        <div
          className="modal fade show"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Match</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={handleDialogClose}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="venue" className="form-label">
                    Venue
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="venue"
                    value={newMatchDetails.venue}
                    onChange={(e) =>
                      setNewMatchDetails({
                        ...newMatchDetails,
                        venue: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="date" className="form-label">
                    Date and Time
                  </label>
                  <input
                    type="datetime-local"
                    className="form-control"
                    id="date"
                    value={newMatchDetails.date}
                    onChange={(e) =>
                      setNewMatchDetails({
                        ...newMatchDetails,
                        date: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="team2" className="form-label">
                    Opponent Team
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="team2"
                    value={newMatchDetails.team2}
                    onChange={(e) =>
                      setNewMatchDetails({
                        ...newMatchDetails,
                        team2: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={handleDialogClose}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={handleAddMatch}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isTeamDialogOpen && (
        <div
          className="modal fade show"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create Team</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={handleTeamDialogClose}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="type" className="form-label">
                    Format
                  </label>
                  <select
                    className="form-select"
                    id="type"
                    value={newTeam.type}
                    onChange={(e) =>
                      setNewTeam({
                        ...newTeam,
                        type: e.target.value,
                      })
                    }
                  >
                    <option value="">Select Venue</option>
                    <option value="T20">T20</option>
                    <option value="ODI">ODI</option>
                    <option value="Test">Test</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="team_name" className="form-label">
                    Team Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="team_name"
                    value={newTeam.team_name}
                    onChange={(e) =>
                      setNewTeam({
                        ...newTeam,
                        team_name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="players" className="form-label">
                    Players
                  </label>
                  {players.map((player) => (
                    <div key={player.player_id} className="form-check">
                      <div className="d-flex justify-content-between">
                        {player.player_name}
                        <div className="">
                          <input
                            type="radio"
                            id={`add_${player.player_id}`}
                            name={`player_${player.player_id}`}
                            value="add"
                            checked={selectedPlayers.includes(player.player_id)}
                            onChange={(e) => {
                              const action = e.target.value;
                              console.log(selectedPlayers);
                              if (action === "add") {
                                setSelectedPlayers((prevSelectedPlayers) => [
                                  ...prevSelectedPlayers,
                                  player.player_id,
                                ]);
                                setNewTeam({
                                  ...newTeam,
                                  players: selectedPlayers,
                                });
                              } else {
                                setSelectedPlayers((prevSelectedPlayers) =>
                                  prevSelectedPlayers.filter(
                                    (id) => id !== player.player_id
                                  )
                                );
                                setNewTeam({
                                  ...newTeam,
                                  players: selectedPlayers,
                                });
                              }
                            }}
                          />
                          <label htmlFor={`add_${player.player_id}`}>Add</label>
                          &nbsp;
                          <input
                            type="radio"
                            id={`remove_${player.player_id}`}
                            name={`player_${player.player_id}`}
                            value="remove"
                            checked={
                              !selectedPlayers.includes(player.player_id)
                            }
                            onChange={(e) => {
                              const action = e.target.value;
                              console.log(selectedPlayers);
                              if (action === "remove") {
                                setSelectedPlayers((prevSelectedPlayers) => [
                                  ...prevSelectedPlayers.filter(
                                    (id) => id !== player.player_id
                                  ),
                                ]);
                                setNewTeam({
                                  ...newTeam,
                                  players: selectedPlayers,
                                });
                              } else {
                                setSelectedPlayers((prevSelectedPlayers) => [
                                  ...prevSelectedPlayers,
                                  player.player_id,
                                ]);
                                setNewTeam({
                                  ...newTeam,
                                  players: selectedPlayers,
                                });
                              }
                            }}
                          />
                          <label htmlFor={`remove_${player.player_id}`}>
                            Remove
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={handleTeamDialogClose}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={handleAddTeam}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllMatches;
