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
    <div className="flex flex-col items-center justify-center gap-4 p-6 bg-slate-800/80 backdrop-blur-md border border-blue-500/30 text-white rounded-xl shadow-2xl w-full max-w-4xl mx-auto mt-6">
      {/* Buttons */}
      <div className="flex flex-wrap justify-center gap-3">
        {phase === "placement" && (
          <>
            <button
              onClick={onToggleOrientation}
              className="bg-blue-600/90 hover:bg-blue-600 px-6 py-2.5 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-sm uppercase tracking-wide shadow-lg hover:shadow-blue-500/50 border border-blue-400/30"
            >
              {orientation === "horizontal" ? "→ Horizontal" : "↓ Vertical"} (R)
            </button>

            <button
              onClick={onRandomize}
              className="bg-indigo-600/90 hover:bg-indigo-600 px-6 py-2.5 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-sm uppercase tracking-wide shadow-lg hover:shadow-indigo-500/50 border border-indigo-400/30"
            >
              Randomize Fleet
            </button>

            <button
              onClick={onStartBattle}
              disabled={!allShipsPlaced}
              className={`px-6 py-2.5 rounded-lg transition-all duration-200 font-semibold text-sm uppercase tracking-wide shadow-lg border ${
                allShipsPlaced
                  ? "bg-green-600/90 hover:bg-green-600 hover:shadow-green-500/50 border-green-400/30"
                  : "bg-slate-700 text-gray-500 cursor-not-allowed border-slate-600"
              }`}
            >
              Begin Battle (Enter)
            </button>
          </>
        )}

        {phase !== "placement" && (
          <button
            onClick={onReset}
            className="bg-red-600/90 hover:bg-red-600 px-6 py-2.5 rounded-lg transition-all duration-200 font-semibold text-sm uppercase tracking-wide shadow-lg hover:shadow-red-500/50 border border-red-400/30"
          >
            New Game
          </button>
        )}
      </div>
    </div>
  );
};

export default Controls;
