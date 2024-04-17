import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Home/Homepage";
import Achievement from "./pages/Achievement/Achievement";
import Login from "./pages/Login/Login";
import AdminPlayer from "./pages/AdminPlayer/AdminPlayer";
import Player from "./pages/Players/Player";
import AllRounder from "./pages/Details/AllRounder";
import Batsman from "./pages/Details/Batsman";
import Bowler from "./pages/Details/Bowler";
import Trophies from "./pages/Details/Trophies";
import Club from "./pages/Club/Club";
import Details from "./pages/AdminPlayer/Details";
import CoachLogin from "./pages/Login/CoachLogin";
import AdminCoach from "./pages/AdminCoach/AdminCoach";
import AllPlayers from "./pages/AdminCoach/AllPlayers";
import MatchesTable from "./pages/Matches/Matches";
import AllMatches from "./pages/AdminCoach/AllMatches";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/achievements" element={<Achievement />} />
          <Route path="/login" element={<Login />} />
          <Route path="/coachlogin" element={<CoachLogin />} />
          <Route path="/players" element={<Player />} />
          <Route path="/matches" element={<MatchesTable />} />
          <Route path="/club" element={<Club />} />
          <Route path="/adminplayer/:playerId" element={<AdminPlayer />} />
          <Route path="/admincoach/:coachId" element={<AdminCoach />} />
          <Route path="/details/:playerId" element={<Details />} />
          <Route path="/allrounder/:playerId" element={<AllRounder />} />
          <Route path="/batsman/:playerId" element={<Batsman />} />
          <Route path="/bowler/:playerId" element={<Bowler />} />
          <Route path="/achievement/:Id" element={<Trophies />} />
          <Route path="/allplayers/:coachId" element={<AllPlayers />} />
          <Route path="/allmatches/:coachId" element={<AllMatches />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
