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

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-3">
        Player {currentPlayer}, place your ships ({currentShip.size} cells)
      </h2>

      <div className="grid grid-cols-10 gap-1 bg-blue-950 p-2 rounded-xl shadow-xl mb-4">
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
  );
};

export default ShipPlacement;
