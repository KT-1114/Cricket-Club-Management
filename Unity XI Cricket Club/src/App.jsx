import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from './pages/Home/Homepage'
import Achievement from './pages/Achievement/Achievement'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/achievements' element={<Achievement/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App