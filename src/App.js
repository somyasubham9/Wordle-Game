
import Board from "./components/Board";
import GameOver from "./components/GameOver";
import KeyBoard from "./components/KeyBoard";
import { useGlobalContext } from "./hooks/context";


function App() {
  const {gameOver}=useGlobalContext();
  return (
    <div className="App">
    <nav><h1>Wordle</h1></nav>
    <div className="game">
    <Board/>
    {gameOver.gameOver ? <GameOver/> : <KeyBoard/>}
    </div>
  
    </div>
  );
}

export default App;
