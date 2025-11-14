/**
 * Scoreboard Component - Game statistics and score tracking
 *
 * Displays the battle record showing wins for each player and total games played.
 * Highlights the current player's score with a different color scheme.
 *
 * Note: Scores are stored in component state and reset on page refresh.
 * They persist only during the current session.
 *
 * @component
 * @param {Object} props - Component props
 * @param {Object} props.scores - Score object with player wins
 * @param {number} props.scores.p1 - Player 1's win count
 * @param {number} props.scores.p2 - Player 2's (or AI's) win count
 * @param {number} props.currentPlayer - Current player number (1 or 2)
 *   Used to highlight the active player's score
 * @param {number} props.totalGames - Total number of games played in this session
 *
 * @returns {JSX.Element} Scoreboard displaying player scores and game statistics
 *
 * @example
 * <Scoreboard
 *   scores={{ p1: 3, p2: 5 }}
 *   currentPlayer={1}
 *   totalGames={8}
 * />
 */
const Scoreboard = ({ scores, currentPlayer, totalGames }) => {
  return (
    <div className="bg-slate-800/80 backdrop-blur-md rounded-xl p-5 w-full sm:w-[360px] text-center shadow-2xl border border-blue-500/30 mb-6">
      <h2 className="text-xl font-bold mb-4 tracking-wide uppercase text-blue-300">
        Battle Record
      </h2>

      <div className="space-y-3 mb-4">
        <div
          className={`flex justify-between items-center p-3 rounded-lg border transition-all ${
            currentPlayer === 1
              ? "bg-blue-600/30 border-blue-400/50"
              : "bg-slate-700/50 border-slate-600/50"
          }`}
        >
          <span className="font-semibold text-blue-300">Player 1</span>
          <span
            className={`text-2xl font-bold ${
              currentPlayer === 1 ? "text-yellow-300" : "text-gray-300"
            }`}
          >
            {scores.p1}
          </span>
        </div>
        <div
          className={`flex justify-between items-center p-3 rounded-lg border transition-all ${
            currentPlayer === 2
              ? "bg-blue-600/30 border-blue-400/50"
              : "bg-slate-700/50 border-slate-600/50"
          }`}
        >
          <span className="font-semibold text-blue-300">Player 2</span>
          <span
            className={`text-2xl font-bold ${
              currentPlayer === 2 ? "text-yellow-300" : "text-gray-300"
            }`}
          >
            {scores.p2}
          </span>
        </div>
      </div>

      <div className="text-sm text-slate-400 border-t border-slate-600/50 pt-3">
        Total Battles:{" "}
        <span className="font-semibold text-blue-300">{totalGames}</span>
      </div>
    </div>
  );
};

export default Scoreboard;
