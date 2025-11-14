// Component for selecting game mode (1v1 or 1vAI) and AI difficulty

const GameModeSelector = ({
  gameMode,
  onGameModeChange,
  aiDifficulty,
  onDifficultyChange,
  phase,
  currentPlayer,
}) => {
  // Only show during placement phase when player 1 hasn't placed any ships yet
  // This allows mode selection before the game starts
  if (phase !== "placement" || currentPlayer !== 1) {
    return null;
  }

  return (
    <div className="w-full max-w-2xl bg-slate-800/80 backdrop-blur-md border border-blue-500/40 rounded-xl p-5 mb-6 shadow-2xl">
      <div className="text-xs uppercase tracking-widest text-blue-400 mb-4 font-semibold text-center">
        Game Mode
      </div>

      {/* Game Mode Toggle */}
      <div className="flex items-center justify-center gap-4 mb-4">
        <button
          onClick={() => onGameModeChange("1v1")}
          className={`px-6 py-3 rounded-lg transition-all duration-200 font-semibold text-sm uppercase tracking-wide shadow-lg border ${
            gameMode === "1v1"
              ? "bg-blue-600/90 hover:bg-blue-600 hover:shadow-blue-500/50 border-blue-400/30 text-white"
              : "bg-slate-700/50 hover:bg-slate-700 border-slate-600/50 text-slate-300"
          }`}
        >
          1 vs 1
        </button>

        <button
          onClick={() => onGameModeChange("1vAI")}
          className={`px-6 py-3 rounded-lg transition-all duration-200 font-semibold text-sm uppercase tracking-wide shadow-lg border ${
            gameMode === "1vAI"
              ? "bg-purple-600/90 hover:bg-purple-600 hover:shadow-purple-500/50 border-purple-400/30 text-white"
              : "bg-slate-700/50 hover:bg-slate-700 border-slate-600/50 text-slate-300"
          }`}
        >
          vs AI
        </button>
      </div>

      {/* AI Difficulty Selector (only shown in 1vAI mode) */}
      {gameMode === "1vAI" && (
        <div className="mt-4 pt-4 border-t border-slate-600/50">
          <div className="text-xs uppercase tracking-widest text-purple-400 mb-3 font-semibold text-center">
            AI Difficulty
          </div>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {["easy", "medium", "hard"].map((difficulty) => (
              <button
                key={difficulty}
                onClick={() => onDifficultyChange(difficulty)}
                className={`px-4 py-2 rounded-lg transition-all duration-200 font-semibold text-xs uppercase tracking-wide shadow-lg border ${
                  aiDifficulty === difficulty
                    ? "bg-purple-600/90 hover:bg-purple-600 hover:shadow-purple-500/50 border-purple-400/30 text-white"
                    : "bg-slate-700/50 hover:bg-slate-700 border-slate-600/50 text-slate-300"
                }`}
              >
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </button>
            ))}
          </div>
          <div className="mt-3 text-xs text-slate-400 text-center">
            {aiDifficulty === "easy" && "Random attacks"}
            {aiDifficulty === "medium" && "Targets adjacent cells after hits"}
            {aiDifficulty === "hard" &&
              "Smart targeting with pattern recognition"}
          </div>
        </div>
      )}
    </div>
  );
};

export default GameModeSelector;
