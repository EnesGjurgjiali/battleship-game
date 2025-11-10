//Component for game controls

import { useEffect } from "react";

const Controls = ({
  phase,
  onStartBattle,
  onReset,
  onRandomize,
  onToggleOrientation,
  currentPlayer,
  orientation,
  allShipsPlaced,
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (phase === "placement" && e.key.toLowerCase() === "r") {
        onToggleOrientation();
      }
      if (phase === "placement" && e.key === "Enter" && allShipsPlaced) {
        onStartBattle();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [phase, allShipsPlaced, onStartBattle, onToggleOrientation]);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 p-4 bg-gray-800 text-white rounded-2xl shadow-lg w-full max-w-3xl mx-auto">
      {/*Game Phase Display */}
      <div className="text-center flex flex-col items-center sm:items-start">
        <p className="text-lg font-semibold tracking-wide">
          Phase: <span className="text-yellow-400 capitalize">{phase}</span>
        </p>
        {phase === "battle" && (
          <p className="text-sm text-gray-300 mt-1">
            Current Turn:{" "}
            <span className="font-semibold text-white">
              Player {currentPlayer}
            </span>
          </p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap justify-center gap-3">
        {phase === "placement" && (
          <>
            <button
              onClick={onToggleOrientation}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Orientation: {orientation === "horizontal" ? "→" : "↓"} (R)
            </button>

            <button
              onClick={onRandomize}
              className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Randomize Ships
            </button>

            <button
              onClick={onStartBattle}
              disabled={!allShipsPlaced}
              className={`px-4 py-2 rounded-md transition ${
                allShipsPlaced
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-green-900 text-gray-400 cursor-not-allowed"
              }`}
            >
              Start Battle (Enter)
            </button>
          </>
        )}

        {phase !== "placement" && (
          <button
            onClick={onReset}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md transition"
          >
            Reset Game
          </button>
        )}
      </div>
    </div>
  );
};

export default Controls;
