//Component for the game board display and interaction.
import Cell from "./Cell";

const Board = ({ currentPlayer, enemyBoard, onAttack, isEnemyView }) => {
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4 tracking-wide uppercase">
        <span className={isEnemyView ? "text-red-400" : "text-green-400"}>
          {isEnemyView ? `Enemy Waters` : `Your Fleet`}
        </span>
      </h2>

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
          <div className="grid grid-cols-10 gap-1 bg-slate-800/60 backdrop-blur-sm p-3 rounded-lg border border-blue-500/30 shadow-2xl">
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
      </div>
    </div>
  );
};

export default Board;
