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
  const [newMatchDetails, setNewMatchDetails] = useState({
    venue: "",
    date: "",
    team2: "",
    team1: "Unity XI",
  });

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

  return (
    <div className="">
      {!loading ? (
        <div className="matches">
          <div className="container mt-5 pt-5">
            <CoachNav curr={"Matches"} id={coachId} />
            <div className="d-flex py-2 justify-content-between">
              <h1 className="text-white">Upcoming Matches</h1>
              <button
                className="btn btn-outline-warning text-dark bg-warning"
                onClick={() => setIsDialogOpen(true)}
              >
                <i class="bi bi-plus-lg"></i> Add Match
              </button>
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
    </div>
  );
};

export default AllMatches;
