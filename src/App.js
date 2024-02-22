import { createContext, useContext, useEffect, useState } from "react";

const data = createContext();

const Tictac = () => {
  let {XsTurn, setXsTurn, moves, setMoves, gameOver} = useContext(data);
  return <>
    {Array.from({length: 9}).map((_,i) => <div key={i} onClick={(e)=> {
      if(e.target.innerText === '' && !gameOver) {
        if(XsTurn) {
          setMoves({ x: [...moves.x, i], y: moves.y});
        } else {
          setMoves({x: moves.x, y: [...moves.y, i]});
        }
        setXsTurn(!XsTurn);
      }
    }} className="bg-white h-32 cursor-pointer text-7xl flex justify-center items-center">{moves.x.includes(i) && "X"}{moves.y.includes(i) && 'O'}</div>)}
  </>
}

function App() {
  let [moves, setMoves] = useState({x: [], y: []})
  let [XsTurn, setXsTurn] = useState(false);
  let [gameOver, setGameOver] = useState(false);

  // checks if the moves have won
  const  checkWin = (mvs) => {
    const winningMoves = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ];
    for(const win of winningMoves) {
      let won = false;
      let moveDone = [];
      for(const singleMove of win) {
        if(mvs.includes(singleMove)) {
          moveDone.push(singleMove);
        }
        if(moveDone.length === 3) {
          won = true;
          break;
        }
      }
      if(won) {
        setGameOver(true);
        if(XsTurn) {
          console.log('O won the game');
        } else {
          console.log('X won the game');
        }
        break;
      }
    }
  }

  useEffect(()=> {
    checkWin(moves.x);
    checkWin(moves.y);
    console.log('checked');
  });

  return <div className="w-full md:w-1/3 mx-auto space-y-4">
    <h2 className="font-bold text-4xl">{XsTurn ? 'X' : 'O'}'s turn</h2>
    <div className =" bg-black gap-2 grid grid-cols-3 p-2">
      <data.Provider value={{XsTurn, setXsTurn, moves, setMoves, gameOver}}>
        <Tictac />
      </data.Provider>  
    </div>
    {gameOver && <h1 className="font-bold text-4xl bg-green-500 text-white text-center p-8">{XsTurn ? "O won!" : "X won!"}</h1>}
    <button className=" px-7 py-5 bg-orange-600 text-white font-bold text-xl hover:bg-orange-500" onClick={()=> {
      setGameOver(false);
      setMoves({x: [], y: []});

    }}>RESET BOARD</button>
  </div>
  
}

export default App;
