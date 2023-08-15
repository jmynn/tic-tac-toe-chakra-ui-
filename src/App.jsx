import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./Home"
import GameProvider from './GameProvider'
import Game from "./Game"

function App() {
  return (
    <GameProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/game" element={<Game />}/>
        </Routes>
      </BrowserRouter>
    </GameProvider>
  )
}

export default App
