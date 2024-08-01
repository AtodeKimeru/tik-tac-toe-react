import { useState } from 'react';
import confetti from 'canvas-confetti';

import { Square } from './components/Square';
import { WinnerModal } from './components/WinnerModal';
import { TURNS } from './constants';
import { checkWinner, checkEndGame } from './logic/board';


function App() {

  const [board, setBoard] = useState(Array(9).fill(null))

  const [turn, setTurn] = useState(TURNS.X)

  const [winner, setWinner] = useState(null)  


  const updateBoard = (index) => {
    // if the position have a value or there's a winner, won't update it
    if (board[index] || winner ) return;
    // update board
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    // change the turn
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    // review if someone wins
    const newWinner = checkWinner(newBoard);
    if (newWinner){
      setWinner(newWinner);
      confetti();
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  }


  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }


  return (
    <main className='board'>
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reset juego</button>
      <section className='game'>
        {
          board.map((square, index) => {
            return (
              <Square 
              key={index} 
              index={index} 
              updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
          })
        }
      </section>

      <section className='turn'>
          <Square isSelected={turn===TURNS.X} >
            {TURNS.X}
          </Square>
          <Square isSelected={turn===TURNS.O} >
            {TURNS.O}
          </Square>
      </section>
      
      <WinnerModal winner={winner} resetGame={resetGame} /> 
      
    </main>
  );
}


export default App;
