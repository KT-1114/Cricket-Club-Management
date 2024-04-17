import React, { useEffect, useState } from "react";
import supabase from "../../connection";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "../Matches/Matches.css";

const MatchesTable = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newMatches, setnewMatches] = useState([]);

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

  const formatDate = (dateTimeString) => {
    return new Date(dateTimeString).toLocaleDateString();
  };

  const formatTime = (dateTimeString) => {
    return new Date(dateTimeString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="">
      {!loading ? (
        <div className="matches">
          <div className="container mt-5 pt-5">
            <Header curr={"Matches"} />
            <h1 className="text-white">Upcoming Matches</h1>
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Venue</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Opponent Team</th>
                  </tr>
                </thead>
                <tbody>
                  {newMatches.map((newMatches) => (
                    <tr key={newMatches.sc_match_id}>
                      <td>{newMatches.venue}</td>
                      <td>{formatDate(newMatches.date)}</td>
                      <td>{formatTime(newMatches.date)}</td>
                      <td>{newMatches.team2}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="container mt-5">
            <Header curr={"Matches"} />
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
    </div>
  );
};

export default MatchesTable;
