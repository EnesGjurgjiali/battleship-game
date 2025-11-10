//Component to display the current status of the game: phase, current player, and winner.

const StatusPanel = ({ phase, currentPlayer, winner, lastAction }) => {
  let message = "";
  if (phase === "placing") {
    message = `Player ${currentPlayer}, place your ships!`;
  } else if (phase === "battle") {
    message = lastAction
      ? lastAction
      : `Player ${currentPlayer}'s turn to attack!`;
  } else if (phase === "gameOver") {
    message = `Player ${winner} wins the battle!`;
  }

  return (
    <div className="w-full max-w-lg bg-blue-800/50 border border-blue-400 rounded-2xl p-4 mb-6 text-center shadow-lg">
      <h2>Game Status</h2>
      <p>{message}</p>

      {phase !== "gameOver" && (
        <div className="mt-3 text-sm text-blue-300">
          Phase: <span className="font-semibold capitalize">{phase}</span>
        </div>
      )}
    </div>
  );
};

export default StatusPanel;
