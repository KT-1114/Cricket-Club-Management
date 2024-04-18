import React, { useEffect, useState } from "react";
import supabase from "../../connection";
import CoachNav from "../../components/CoachNav/CoachNav";
import { useNavigate, useParams } from "react-router-dom";

const AllPlayers = (props) => {
  const { coachId } = useParams();
  const [players, setPlayers] = useState([]);
  const [playerToDelete, setPlayerToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlayers = async () => {
      const { data, error } = await supabase
        .from("players")
        .select("*")
        // .order("club_id", { ascending: true });
      .eq("club_id", 1);
      if (error) {
        console.error("Error fetching players:", error.message);
      } else {
        setPlayers(data);
      }
    };

    fetchPlayers();
  }, []);

  const handleDelete = async (playerId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this player?");
    if (confirmDelete) {
      const { error } = await supabase.from("players").delete().eq("player_id", playerId);
      if (error) {
        console.error("Error deleting player:", error.message);
      } else {
        setPlayers(players.filter((player) => player.player_id !== playerId));
        setPlayerToDelete(null);
      }
    }
};

  return (
    <div className="container-fluid">
      {players ? (
        <div className="py-5">
          <CoachNav curr={"Players"} id={coachId} />
          <h1 className="my-4 mt-5 pt-5 text-white">Players</h1>
          <div className="table-responsive" style={{borderRadius: "10px"}}>
            <table className="table align-middle mb-0 bg-white p-3">
              <thead className="bg-light">
                <tr>
                  <th className="text-center">Name</th>
                  <th className="text-center">City/Age</th>
                  <th className="text-center">Contact</th>
                  <th className="text-center">Speciality</th>
                  <th className="text-center">Jersey Number</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {players.map((player) => (
                  <tr key={player.player_id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          src={player.photo}
                          alt=""
                          style={{ height: "45px", width: "45px" }}
                          className="rounded-circle"
                        />
                        <div className="ms-3">
                          <p className="fw-bold mb-1">{player.player_name}</p>
                          <p className="text-muted text-center mb-0">
                            {player.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="fw-normal text-center mb-1">
                        {player.city}
                      </p>
                      <p className="text-muted text-center mb-0">
                        Age: {player.age}
                      </p>
                    </td>
                    <td>{player.contact}</td>
                    <td className="text-center">{player.speciality}</td>
                    <td>
                      <p className="fw-normal text-center mb-1">
                        {player.jersey_num}
                      </p>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-sm btn-rounded"
                        onClick={() => setPlayerToDelete(player.player_id)}
                      >
                        <i class="bi bi-trash3-fill text-danger"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        ""
      )}
      {playerToDelete && (
        <div
          className="modal fade show"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Deletion</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setPlayerToDelete(null)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this player?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setPlayerToDelete(null)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={() => handleDelete(playerToDelete)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllPlayers;
