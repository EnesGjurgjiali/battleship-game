//Component to display the current status of the game: phase, current player, and winner.

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
