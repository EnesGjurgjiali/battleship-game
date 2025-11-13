//Component for ship placement phase
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
