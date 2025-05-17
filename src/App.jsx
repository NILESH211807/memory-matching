import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';
import { GameProvider } from './context/GameContext';

const App = () => {
   return (
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/game" element={
            <GameProvider>
               <Game />
            </GameProvider>
         } />
      </Routes>
   )
}

export default App;
