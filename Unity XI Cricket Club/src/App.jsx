import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './pages/Home/Homepage'
import Achievement from './pages/Achievement/Achievement'
import Login from './pages/Login/Login'
import AdminPlayer from './pages/AdminPlayer/AdminPlayer'
import Player from './pages/Players/Player'
import PlayerDetails from './pages/PlayerDetail/PlayerDetails'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/achievements' element={<Achievement/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/players' element={<Player/>}/>
          <Route path='/adminplayer/:playerId' element={<AdminPlayer/>}/>
          <Route path='/player/:playerId' element={<PlayerDetails/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App