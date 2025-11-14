/**
 * ShipPlacement Component - Ship placement interface
 *
 * Provides the interface for players to place their ships on the board during
 * the placement phase. Displays the current ship being placed and allows players
 * to click on the board to position ships.
 *
 * Features:
 * - Shows current player and ship information
 * - Displays board with coordinate labels (A-J, 1-10)
 * - Allows clicking cells to place ships
 * - Shows already placed ships on the board
 *
 * @component
 * @param {Object} props - Component props
 * @param {number} props.currentPlayer - Current player number (1 or 2)
 * @param {Array<Array<string|null>>} props.board - 2D array representing the player's board
 *   - null: Empty cell
 *   - "S": Ship segment
 * @param {Function} props.onPlace - Callback when a cell is clicked to place ship
 *   - Called with (rowIndex, colIndex) coordinates
 * @param {Object} props.currentShip - Current ship being placed
 * @param {string} props.currentShip.name - Ship name (e.g., "Carrier", "Battleship")
 * @param {number} props.currentShip.size - Ship size in cells
 * @param {string} props.orientation - Ship orientation ("horizontal" | "vertical")
 *
 * @returns {JSX.Element} Ship placement interface with board and ship information
 *
 * @example
 * <ShipPlacement
 *   currentPlayer={1}
 *   board={playerBoard}
 *   onPlace={(x, y) => handlePlaceShip(x, y)}
 *   currentShip={{ name: "Carrier", size: 5 }}
 *   orientation="horizontal"
 * />
 */
import { useState } from "react";
import Cell from "./Cell";

const ShipPlacement = ({
  currentPlayer,
  board,
  onPlace,
  currentShip,
  orientation,
}) => {
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 text-center">
        <h2 className="text-2xl font-bold mb-2 tracking-wide">
          <span className="text-cyan-300">Player {currentPlayer}</span>
        </h2>
        <p className="text-blue-300 text-sm">
          Deploy:{" "}
          <span className="font-semibold text-white">{currentShip.name}</span> (
          {currentShip.size} cells)
        </p>
      </div>

      <div className="relative">
        {/* Column labels (letters) */}
        <div className="grid grid-cols-10 gap-1 mb-1 ml-8">
          {letters.map((letter) => (
            <div
              key={letter}
              className="w-9 sm:w-11 text-center text-xs font-semibold text-blue-300"
            >
              {letter}
            </div>
          ))}
        </div>

        <div className="flex">
          {/* Row labels (numbers) */}
          <div className="flex flex-col gap-1 mr-1 justify-center">
            {numbers.map((num) => (
              <div
                key={num}
                className="h-9 sm:h-11 flex items-center justify-center text-xs font-semibold text-blue-300 w-6 sm:w-8"
              >
                {num}
              </div>
            ))}
          </div>

          {/* Game board */}
          <div className="grid grid-cols-10 gap-1 bg-slate-800/60 backdrop-blur-sm p-3 rounded-lg border border-blue-500/30 shadow-2xl mb-4">
            {board.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <Cell
                  key={`${rowIndex}-${colIndex}`}
                  value={cell}
                  onClick={() => onPlace(rowIndex, colIndex)}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipPlacement;
