import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './pages/Home/Homepage'
import Achievement from './pages/Achievement/Achievement'
import Login from './pages/Login/Login'
import AdminPlayer from './pages/AdminPlayer/AdminPlayer'
import Player from './pages/Players/Player'
import AllRounder from './pages/Details/AllRounder'
import Batsman from './pages/Details/Batsman'
import Bowler from './pages/Details/Bowler'
import Trophies from './pages/Details/Trophies'
import Club from './pages/Club/Club'
import Details from './pages/AdminPlayer/Details'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/achievements' element={<Achievement/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/players' element={<Player/>}/>
          <Route path='/club' element={<Club/>}/>
          <Route path='/adminplayer/:playerId' element={<AdminPlayer/>}/>
          <Route path='/details/:playerId' element={<Details/>}/>
          <Route path='/allrounder/:playerId' element={<AllRounder/>}/>
          <Route path='/batsman/:playerId' element={<Batsman/>}/>
          <Route path='/bowler/:playerId' element={<Bowler/>}/>
          <Route path='/achievement/:Id' element={<Trophies/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App