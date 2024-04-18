import React, { useEffect, useState } from "react";
import supabase from "../../connection";
import { useNavigate, useParams } from "react-router-dom";
import CoachNav from "../../components/CoachNav/CoachNav";
import Footer from "../../components/Footer/Footer";

const Teams = () => {
  const { coachId } = useParams();
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    const { data: teams, error } = await supabase.from("team").select("*");
    if (error) {
      console.error("Error fetching teams:", error.message);
    } else {
      setTeams(teams);
    }
  };

  
  const deleteTeam = async (teamId) => {
    const { error } = await supabase.from("team").delete().eq("team_id", teamId);
    alert("Team deleted successfully.");
    navigate("/admincoach/"+coachId);
    if (error) {
      console.error("Error deleting team:", error.message);
    } else {
      setTeams(teams.filter((team) => team.id !== teamId));
    }
  };


  return (
    <div className="">
      <CoachNav curr={"Teams"} id={coachId} />
      <div className="container-fluid mt-5 py-5">
        <div className="row">
          {teams.map((team) => (
            <div className="col-md-6" key={team.team_id}>
              <TeamTable team={team} onDelete={() => deleteTeam(team.team_id)}/>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

const TeamTable = ({ team, onDelete }) => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    const { data: players, error } = await supabase
      .from("players")
      .select("player_name, jersey_num, speciality")
      .in("player_id", team.players);

    if (error) {
      console.error("Error fetching players:", error.message);
    } else {
      setPlayers(players);
    }
  };

  return (
    <div>
      <div className="">
        <div className="d-flex justify-content-between py-1">
        <h2 className="text-white">{team.team_name}&nbsp; ({team.type})</h2>
        <button className="btn btn-outline-danger" onClick={onDelete}>
        <i class="bi bi-trash3-fill text-outline-danger"></i>
          </button>
        </div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Player Name</th>
              <th>Jersey Number</th>
              <th>Speciality</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr key={player.player_id}>
                <td>{player.player_name}</td>
                <td>{player.jersey_num}</td>
                <td>{player.speciality}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Teams;
``;
