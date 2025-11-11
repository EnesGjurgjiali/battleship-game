const Scoreboard = ({ scores, currentPlayer, totalGames }) => {
  return (
    <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 w-full sm:w-[320px] text-center shadow-lg border border-white/20">
      <h2 className="text-2xl font-semibold mb-3">Scoreboard</h2>

      <div className="flex justify-between items-center mb-3 text-lg">
        <span
          className={currentPlayer === 1 ? "text-yellow-300 font-bold" : ""}
        >
          Player 1: {scores.p1}
        </span>
        <span
          className={currentPlayer === 2 ? "text-yellow-300 font-bold" : ""}
        >
          Player 2: {scores.p2}
        </span>
      </div>

      <div className="text-sm text-gray-200">Games Played: {totalGames}</div>
    </div>
  );
};

export default Scoreboard;
