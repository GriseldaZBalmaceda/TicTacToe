import React, { useState } from "react"

export default function GameBoard({ board, onSelectSquare }) {
  //   const handleSelectSquare = (rowIndex, colIndex) => {
  //     setGameboard((prevGameBoard) => {
  //       //below is bad practice. you need to
  //       // prevGameBoard[rowIndex][colIndex] = "X"
  //       // return prevGameBoard
  //       //below is using a better approach by updating the state in an immutable way.
  //       const updatedBoard = [
  //         ...prevGameBoard.map((innerArray) => [...innerArray]),
  //       ]
  //       updatedBoard[rowIndex][colIndex] = activePlayer
  //       return updatedBoard
  //     })
  //     onSelectSquare()
  //   }
  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => {
        return (
          <li key={rowIndex}>
            <ol>
              {row.map((playerSymbol, colIndex) => (
                <li key={colIndex}>
                  <button
                    onClick={() => onSelectSquare(rowIndex, colIndex)}
                    disabled={playerSymbol !== null ? true : false}
                  >
                    {playerSymbol}
                  </button>
                </li>
              ))}
            </ol>
          </li>
        )
      })}
    </ol>
  )
}
