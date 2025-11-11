// Component for the main game logic and state management

import { useState } from "react";
import StatusPanel from "./StatusPanel";
import ShipPlacement from "./ShipPlacement";
import Board from "./Board";
import Controls from "./Controls";
import Scoreboard from "./Scoreboard";

const BOARD_SIZE = 10;
const SHIPS = [
  { name: "Carrier", size: 5 },
  { name: "Battleship", size: 4 },
  { name: "Cruiser", size: 3 },
  { name: "Submarine", size: 3 },
  { name: "Destroyer", size: 2 },
];

const emptyBoard = () =>
  Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(null));

const Game = () => {
  const [phase, setPhase] = useState("placement"); // placement | battle | gameOver
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [boards, setBoards] = useState({ 1: emptyBoard(), 2: emptyBoard() });
  const [winner, setWinner] = useState(null);
  const [lastAction, setLastAction] = useState("");
  const [currentShipIndex, setCurrentShipIndex] = useState(0);
  const [orientation, setOrientation] = useState("horizontal"); // horizontal or vertical
  const [scores, setScores] = useState({ p1: 0, p2: 0 });
  const [totalGames, setTotalGames] = useState(0);

  // Handlers
  const toggleOrientation = () => {
    setOrientation((prev) =>
      prev === "horizontal" ? "vertical" : "horizontal"
    );
  };

  const handlePlaceShip = (x, y) => {
    const ship = SHIPS[currentShipIndex];
    const newBoard = structuredClone(boards[currentPlayer]);

    // Check if ship fits and cells are empty
    for (let i = 0; i < ship.size; i++) {
      const row = orientation === "horizontal" ? x : x + i;
      const col = orientation === "horizontal" ? y + i : y;
      if (
        row >= BOARD_SIZE ||
        col >= BOARD_SIZE ||
        newBoard[row][col] === "S"
      ) {
        alert("Cannot place ship here!");
        return;
      }
    }

    // Place the ship
    for (let i = 0; i < ship.size; i++) {
      const row = orientation === "horizontal" ? x : x + i;
      const col = orientation === "horizontal" ? y + i : y;
      newBoard[row][col] = "S";
    }

    setBoards((prev) => ({ ...prev, [currentPlayer]: newBoard }));

    // Move to next ship
    if (currentShipIndex + 1 < SHIPS.length) {
      setCurrentShipIndex((prev) => prev + 1);
    } else {
      // All ships placed for current player
      if (currentPlayer === 1) {
        setCurrentPlayer(2);
        setCurrentShipIndex(0); // reset for player 2
      } else {
        setPhase("battle");
        setCurrentPlayer(1);
        setLastAction(`Player 1's turn to attack!`);
      }
    }
  };

  const handleAttack = (enemyPlayer, x, y) => {
    if (phase !== "battle") return;
    const newBoard = structuredClone(boards[enemyPlayer]);
    const cell = newBoard[x][y];

    let actionMessage = "";
    if (cell === "S") {
      newBoard[x][y] = "H";
      actionMessage = "Hit!";
    } else if (!cell) {
      newBoard[x][y] = "M";
      actionMessage = "Miss!";
    } else {
      // Already attacked
      return;
    }

    setBoards((prev) => ({ ...prev, [enemyPlayer]: newBoard }));
    setLastAction(actionMessage);

    // Check for winner
    const hasShipsLeft = newBoard.some((row) => row.includes("S"));
    if (!hasShipsLeft) {
      setWinner(currentPlayer);
      setPhase("gameOver");
      setLastAction(`Player ${currentPlayer} wins!`);

      setScores((prev) => ({
        ...prev,
        [currentPlayer === 1 ? "p1" : "p2"]:
          prev[currentPlayer === 1 ? "p1" : "p2"] + 1,
      }));
      setTotalGames((prev) => prev + 1);
    } else {
      // Switch turn
      setCurrentPlayer((prev) => (prev === 1 ? 2 : 1));
    }
  };

  const restartGame = () => {
    setBoards({ 1: emptyBoard(), 2: emptyBoard() });
    setPhase("placement");
    setCurrentPlayer(1);
    setWinner(null);
    setLastAction("");
    setCurrentShipIndex(0);
    setOrientation("horizontal");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-b from-sky-900 to-blue-700 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">🚢 Battleship Game</h1>

      <StatusPanel
        phase={phase}
        currentPlayer={currentPlayer}
        winner={winner}
        lastAction={lastAction}
      />

      <Scoreboard
        scores={scores}
        currentPlayer={currentPlayer}
        totalGames={totalGames}
      />

      {phase === "placement" && (
        <ShipPlacement
          currentPlayer={currentPlayer}
          board={boards[currentPlayer]}
          onPlace={handlePlaceShip}
          currentShip={SHIPS[currentShipIndex]}
          orientation={orientation}
        />
      )}

      {phase === "battle" && (
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Player's own board */}
          <Board
            currentPlayer={currentPlayer}
            enemyBoard={boards[currentPlayer]}
            isEnemyView={false}
          />

          {/* Enemy board */}
          <Board
            currentPlayer={currentPlayer}
            enemyBoard={boards[currentPlayer === 1 ? 2 : 1]}
            isEnemyView={true}
            onAttack={(x, y) => handleAttack(currentPlayer === 1 ? 2 : 1, x, y)}
          />
        </div>
      )}

      <Controls
        phase={phase}
        onReset={restartGame}
        onToggleOrientation={toggleOrientation}
        orientation={orientation}
        allShipsPlaced={phase === "battle"}
        currentPlayer={currentPlayer}
      />
    </div>
  );
};

export default Game;
