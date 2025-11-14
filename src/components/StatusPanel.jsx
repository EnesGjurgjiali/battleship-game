/**
 * StatusPanel Component - Game status and information display
 *
 * Displays the current game status, including phase information, current player,
 * last action result (hit/miss), and winner announcement. Adapts messages based
 * on game mode (1v1 vs 1vAI) to provide appropriate feedback.
 *
 * Status Messages:
 * - Placement: "Player X, deploy your fleet" or "AI is deploying its fleet..."
 * - Battle: "Player X's turn - Select target" or "AI is thinking..." or hit/miss feedback
 * - GameOver: "Player X victorious!" or "AI victorious!"
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.phase - Current game phase ("placement" | "battle" | "gameOver")
 * @param {number} props.currentPlayer - Current player number (1 or 2)
 * @param {number|null} props.winner - Winner player number (1 or 2), null if game not over
 * @param {string} props.lastAction - Last action result ("Hit!" | "Miss!" | "")
 * @param {string} [props.gameMode="1v1"] - Current game mode ("1v1" | "1vAI")
 *
 * @returns {JSX.Element} Status panel with current game information
 *
 * @example
 * <StatusPanel
 *   phase="battle"
 *   currentPlayer={1}
 *   winner={null}
 *   lastAction="Hit!"
 *   gameMode="1vAI"
 * />
 */
const StatusPanel = ({
  phase,
  currentPlayer,
  winner,
  lastAction,
  gameMode = "1v1",
}) => {
  let message = "";
  let statusColor = "text-blue-300";

  if (phase === "placement") {
    if (currentPlayer === 2 && gameMode === "1vAI") {
      message = "AI is deploying its fleet...";
      statusColor = "text-purple-300";
    } else {
      message = `Player ${currentPlayer}, deploy your fleet`;
      statusColor = "text-yellow-300";
    }
  } else if (phase === "battle") {
    if (lastAction === "Hit!") {
      statusColor = "text-red-400";
      message = "HIT! Target destroyed";
    } else if (lastAction === "Miss!") {
      statusColor = "text-gray-300";
      message = "MISS! No contact";
    } else {
      statusColor = "text-cyan-300";
      if (currentPlayer === 2 && gameMode === "1vAI") {
        message = "AI is thinking...";
      } else {
        message = `Player ${currentPlayer}'s turn - Select target`;
      }
    }
  } else if (phase === "gameOver") {
    statusColor = "text-green-400";
    if (gameMode === "1vAI" && winner === 2) {
      message = "AI victorious!";
    } else if (gameMode === "1vAI" && winner === 1) {
      message = "Player 1 victorious!";
    } else {
      message = `Player ${winner} victorious!`;
    }
  }

  return (
    <div className="w-full max-w-2xl bg-slate-800/80 backdrop-blur-md border border-blue-500/40 rounded-xl p-5 mb-6 text-center shadow-2xl">
      <div className="text-xs uppercase tracking-widest text-blue-400 mb-2 font-semibold">
        Status Report
      </div>
      <p className={`text-xl font-bold ${statusColor} tracking-wide`}>
        {message}
      </p>

      {phase !== "gameOver" && (
        <div className="mt-3 text-sm text-slate-400">
          Phase:{" "}
          <span className="font-semibold capitalize text-blue-300">
            {phase}
          </span>
        </div>
      )}
    </div>
  );
};

export default StatusPanel;
