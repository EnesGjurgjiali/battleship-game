//Component for the game board display and interaction.
import Cell from "./Cell";

const Board = ({ currentPlayer, enemyBoard, onAttack, isEnemyView }) => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-3">
        {isEnemyView ? `Enemy Board` : `Your Board`}
      </h2>

      <div className="grid grid-cols-10 gap-1 bg-blue-950 p-2 rounded-xl shadow-xl">
        {enemyBoard.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            // Determine what to show on enemy board
            let displayValue = cell;

            if (isEnemyView) {
              if (cell === "S") displayValue = null; // We hide ships here
            }

            return (
              <Cell
                key={`${rowIndex}-${colIndex}`}
                value={displayValue}
                onClick={() => isEnemyView && onAttack(rowIndex, colIndex)}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default Board;
