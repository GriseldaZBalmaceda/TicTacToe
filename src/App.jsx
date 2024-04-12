import React, { useState } from "react"
import GameBoard from "../components/GameBoard"
import Player from "../components/Player"
import Log from "../components/Log"
import { WINNING_COMBINATIONS } from "../winningCombinations"
import GameOver from "../components/GameOver"
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]
const PLAYERS = {
  X: "Player1",
  O: "Player 2",
}
function derivedActivePlayer(gameTurns) {
  let currentPlayer = "X"
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O"
  }
  return currentPlayer
}

const derivedWinner = (gameboard, players) => {
  let winner

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquare = gameboard[combination[0].row][combination[0].column]
    const secondSquare = gameboard[combination[1].row][combination[1].column]
    const thirdSquare = gameboard[combination[2].row][combination[2].column]
    if (
      firstSquare &&
      firstSquare === secondSquare &&
      firstSquare === thirdSquare
    ) {
      winner = players[firstSquare]
    }
  }
  return winner
}
const derivedGameBoard = (gameTurns) => {
  let gameboard = [...INITIAL_GAME_BOARD.map((array) => [...array])]
  for (const turn of gameTurns) {
    const { square, player } = turn
    const { row, col } = square
    gameboard[row][col] = player
  }
  return gameboard
}
function App() {
  // const [activePlayer, setActivePlayer] = useState("X")
  const [players, setPlayers] = useState(PLAYERS)

  const [gameTurns, setGameTurns] = useState([])

  const activePlayer = derivedActivePlayer(gameTurns)
  const gameboard = derivedGameBoard(gameTurns)
  const winner = derivedWinner(gameboard, players)
  const hasDraw = gameTurns.length === 9 && !winner

  const handleRestart = () => {
    setGameTurns([])
  }
  const handlePlayerNameChange = (symbol, newName) => {
    setPlayers((prevPlayer) => {
      return {
        ...prevPlayer,
        [symbol]: newName,
      }
    })
  }
  const handleSelectSquare = (rowIndex, colIndex) => {
    setGameTurns((prevTurns) => {
      const currentPlayer = derivedActivePlayer(prevTurns)
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ]
      return updatedTurns
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard board={gameboard} onSelectSquare={handleSelectSquare} />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
