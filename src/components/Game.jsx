/**
 * Game Component - Main game logic and state management
 *
 * This is the core component that manages the entire Battleship game state,
 * including game phases (placement, battle, gameOver), player turns, ship placement,
 * attack handling, AI integration, and score tracking.
 *
 * Features:
 * - Manages game state (phase, current player, boards, scores)
 * - Handles ship placement for both players
 * - Processes attacks and determines winners
 * - Integrates AI player with three difficulty levels
 * - Tracks game statistics across multiple rounds
 * - Manages two game modes: 1v1 and 1vAI
 *
 * Game Phases:
 * - "placement": Players place their ships on the board
 * - "battle": Players take turns attacking each other
 * - "gameOver": Game has ended, winner is determined
 *
 * @component
 * @returns {JSX.Element} The main game interface with all sub-components
 */
import { useState, useEffect, useRef } from "react";
import StatusPanel from "./StatusPanel";
import ShipPlacement from "./ShipPlacement";
import Board from "./Board";
import Controls from "./Controls";
import Scoreboard from "./Scoreboard";
import GameModeSelector from "./GameModeSelector";
import { placeAIShips, getAIAttack } from "../utils/aiPlayer";

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
  const [gameMode, setGameMode] = useState("1v1"); // "1v1" or "1vAI"
  const [aiDifficulty, setAiDifficulty] = useState("medium"); // "easy", "medium", "hard"
  const [aiAttackBoard, setAiAttackBoard] = useState(emptyBoard()); // Board showing AI's view of player 1's board
  const [playerAttackBoard, setPlayerAttackBoard] = useState(emptyBoard()); // Board showing player 1's view of AI's board
  const [showTurnOverlay, setShowTurnOverlay] = useState(false); // Overlay for 1v1 turn switching
  const aiAttackInProgress = useRef(false); // Prevent multiple simultaneous AI attacks

  const isModSelectionPhase =
    phase === "placement" &&
    currentPlayer === 1 &&
    boards[1].flat().every((cell) => cell === null);

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
        // Show overlay for first turn in 1v1 mode
        if (gameMode === "1v1") {
          setShowTurnOverlay(true);
        }
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

    // Update AI attack board when player 1 is attacked (AI's view of player 1's board)
    if (enemyPlayer === 1 && gameMode === "1vAI") {
      setAiAttackBoard((prev) => {
        const newAiBoard = structuredClone(prev);
        newAiBoard[x][y] = newBoard[x][y]; // Update with H or M
        return newAiBoard;
      });
    }

    // Update player attack board when AI is attacked (player 1's view of AI's board)
    if (enemyPlayer === 2 && gameMode === "1vAI" && currentPlayer === 1) {
      setPlayerAttackBoard((prev) => {
        const newPlayerBoard = structuredClone(prev);
        // Only store H or M, never S (ships should be hidden from player)
        newPlayerBoard[x][y] = actionMessage === "Hit!" ? "H" : "M";
        return newPlayerBoard;
      });
    }

    setLastAction(actionMessage);

    // Check for winner
    const hasShipsLeft = newBoard.some((row) => row.includes("S"));
    if (!hasShipsLeft) {
      setWinner(currentPlayer);
      setPhase("gameOver");
      const winnerName =
        currentPlayer === 1
          ? "Player 1"
          : gameMode === "1vAI"
          ? "AI"
          : "Player 2";
      setLastAction(`${winnerName} wins!`);

      setScores((prev) => ({
        ...prev,
        [currentPlayer === 1 ? "p1" : "p2"]:
          prev[currentPlayer === 1 ? "p1" : "p2"] + 1,
      }));
      setTotalGames((prev) => prev + 1);
    } else {
      // Switch turn - show overlay for 1v1 mode
      if (gameMode === "1v1") {
        setShowTurnOverlay(true);
      }
      setCurrentPlayer((prev) => (prev === 1 ? 2 : 1));
    }
  };

  const randomizeShips = () => {
    const newBoard = emptyBoard();
    const shipsToPlace = [...SHIPS];

    // Try to place each ship randomly
    for (const ship of shipsToPlace) {
      let placed = false;
      let attempts = 0;

      while (!placed && attempts < 100) {
        const randomX = Math.floor(Math.random() * BOARD_SIZE);
        const randomY = Math.floor(Math.random() * BOARD_SIZE);
        const randomOrientation =
          Math.random() > 0.5 ? "horizontal" : "vertical";

        // Check if ship fits
        let canPlace = true;
        for (let i = 0; i < ship.size; i++) {
          const row =
            randomOrientation === "horizontal" ? randomX : randomX + i;
          const col =
            randomOrientation === "horizontal" ? randomY + i : randomY;
          if (
            row >= BOARD_SIZE ||
            col >= BOARD_SIZE ||
            newBoard[row][col] === "S"
          ) {
            canPlace = false;
            break;
          }
        }

        if (canPlace) {
          // Place the ship
          for (let i = 0; i < ship.size; i++) {
            const row =
              randomOrientation === "horizontal" ? randomX : randomX + i;
            const col =
              randomOrientation === "horizontal" ? randomY + i : randomY;
            newBoard[row][col] = "S";
          }
          placed = true;
        }
        attempts++;
      }
    }

    setBoards((prev) => ({ ...prev, [currentPlayer]: newBoard }));

    // Check if all ships are placed
    const allShipsPlaced = shipsToPlace.every((ship) => {
      let count = 0;
      for (let row of newBoard) {
        for (let cell of row) {
          if (cell === "S") count++;
        }
      }
      return count === shipsToPlace.reduce((sum, s) => sum + s.size, 0);
    });

    if (allShipsPlaced) {
      if (currentPlayer === 1) {
        setCurrentPlayer(2);
        setCurrentShipIndex(0);
      } else {
        setPhase("battle");
        setCurrentPlayer(1);
        setLastAction(`Player 1's turn to attack!`);
        // Show overlay for first turn in 1v1 mode
        if (gameMode === "1v1") {
          setShowTurnOverlay(true);
        }
      }
    } else {
      setCurrentShipIndex(0);
    }
  };

  const startBattle = () => {
    // Check if all ships are placed for current player
    const board = boards[currentPlayer];
    const totalShipCells = SHIPS.reduce((sum, ship) => sum + ship.size, 0);
    const placedCells = board.flat().filter((cell) => cell === "S").length;

    if (placedCells === totalShipCells) {
      if (currentPlayer === 1) {
        setCurrentPlayer(2);
        setCurrentShipIndex(0);
      } else {
        setPhase("battle");
        setCurrentPlayer(1);
        setLastAction(`Player 1's turn to attack!`);
        // Initialize attack boards when entering battle phase
        if (gameMode === "1vAI") {
          setPlayerAttackBoard(emptyBoard());
          setAiAttackBoard(emptyBoard());
        } else {
          // Show overlay for first turn in 1v1 mode
          setShowTurnOverlay(true);
        }
      }
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
    setAiAttackBoard(emptyBoard());
    setPlayerAttackBoard(emptyBoard());
    setShowTurnOverlay(false); // Reset overlay
    aiAttackInProgress.current = false;
  };

  // Check if all ships are placed for current player
  const checkAllShipsPlaced = () => {
    if (phase !== "placement") return false;
    const board = boards[currentPlayer];
    const totalShipCells = SHIPS.reduce((sum, ship) => sum + ship.size, 0);
    const placedCells = board.flat().filter((cell) => cell === "S").length;
    return placedCells === totalShipCells;
  };

  // Handle AI ship placement
  useEffect(() => {
    if (phase === "placement" && currentPlayer === 2 && gameMode === "1vAI") {
      const board = boards[2];
      const totalShipCells = SHIPS.reduce((sum, ship) => sum + ship.size, 0);
      const placedCells = board.flat().filter((cell) => cell === "S").length;

      // Only place ships if they haven't been placed yet
      if (placedCells !== totalShipCells) {
        // AI places all ships automatically
        const aiBoard = placeAIShips();
        setBoards((prev) => ({ ...prev, 2: aiBoard }));
        setCurrentShipIndex(SHIPS.length); // Mark all ships as placed

        // Move to battle phase
        setTimeout(() => {
          setPhase("battle");
          setCurrentPlayer(1);
          setLastAction("Player 1's turn to attack!");
          setAiAttackBoard(emptyBoard()); // Initialize AI attack board
          setPlayerAttackBoard(emptyBoard()); // Initialize player attack board
        }, 500);
      }
    }
  }, [phase, currentPlayer, gameMode]);

  // Handle AI attacks
  useEffect(() => {
    if (
      phase === "battle" &&
      currentPlayer === 2 &&
      gameMode === "1vAI" &&
      !winner &&
      !aiAttackInProgress.current
    ) {
      aiAttackInProgress.current = true;
      // AI's turn to attack
      const delay =
        aiDifficulty === "easy" ? 800 : aiDifficulty === "medium" ? 600 : 400;

      const timeoutId = setTimeout(() => {
        const attack = getAIAttack(aiAttackBoard, aiDifficulty);

        if (attack) {
          const [x, y] = attack;
          handleAttack(1, x, y);
        }
        aiAttackInProgress.current = false;
      }, delay);

      return () => {
        clearTimeout(timeoutId);
        aiAttackInProgress.current = false;
      };
    }
  }, [phase, currentPlayer, gameMode, aiAttackBoard, aiDifficulty, winner]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-slate-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-2 tracking-wide text-center">
        <span className="text-shadow-white">BATTLESHIP</span>
      </h1>

      {/* Show only GameModeSelector when in mode selection phase */}
      {isModSelectionPhase ? (
        <GameModeSelector
          gameMode={gameMode}
          onGameModeChange={setGameMode}
          aiDifficulty={aiDifficulty}
          onDifficultyChange={setAiDifficulty}
          phase={phase}
          currentPlayer={currentPlayer}
        />
      ) : (
        <>
          <StatusPanel
            phase={phase}
            currentPlayer={currentPlayer}
            winner={winner}
            lastAction={lastAction}
            gameMode={gameMode}
          />

          <Scoreboard
            scores={scores}
            currentPlayer={currentPlayer}
            totalGames={totalGames}
          />
        </>
      )}

      {phase === "placement" && currentPlayer === 1 && (
        <ShipPlacement
          currentPlayer={currentPlayer}
          board={boards[currentPlayer]}
          onPlace={handlePlaceShip}
          currentShip={SHIPS[currentShipIndex]}
          orientation={orientation}
        />
      )}

      {phase === "placement" && currentPlayer === 2 && gameMode === "1v1" && (
        <ShipPlacement
          currentPlayer={currentPlayer}
          board={boards[currentPlayer]}
          onPlace={handlePlaceShip}
          currentShip={SHIPS[currentShipIndex]}
          orientation={orientation}
        />
      )}

      {phase === "placement" && currentPlayer === 2 && gameMode === "1vAI" && (
        <div className="text-center text-blue-300 text-lg font-semibold py-8">
          AI is placing its fleet...
        </div>
      )}

      {phase === "battle" && (
        <div className="relative">
          {/* Turn overlay for 1v1 mode */}
          {gameMode === "1v1" && showTurnOverlay && (
            <div
              className="absolute inset-0 z-50 flex flex-col items-center justify-center rounded-lg bg-[#020617] border border-blue-400/20shadow-[0_0_35px_rgba(0,100,255,0.25)]
              before:pointer-events-none
              before:absolute before:inset-0 before:rounded-lg
              before:bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)]
              before:bg-size-[100%_3px]

              after:pointer-events-none
              after:absolute after:inset-0 after:rounded-lg
              after:bg-linear-to-b after:from-white/10 after:to-transparent
              "
            >
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Player {currentPlayer}'s Turn
                </h2>
                <p className="text-xl text-gray-300 mb-6">
                  Pass the device to Player {currentPlayer}
                </p>
                <button
                  onClick={() => setShowTurnOverlay(false)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors cursor-pointer z-10"
                >
                  I'm Ready!
                </button>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-6">
            {/* Player's own board - show current player's board in 1v1, only player 1's board in 1vAI */}
            <Board
              currentPlayer={gameMode === "1vAI" ? 1 : currentPlayer}
              enemyBoard={
                gameMode === "1vAI" ? boards[1] : boards[currentPlayer]
              }
              isEnemyView={false}
            />

            {/* Enemy board */}
            {gameMode === "1vAI" ? (
              // In 1vAI mode, show player's attack board (hits/misses on AI's board)
              <Board
                currentPlayer={1}
                enemyBoard={playerAttackBoard}
                isEnemyView={true}
                onAttack={
                  currentPlayer === 1
                    ? (x, y) => handleAttack(2, x, y)
                    : undefined
                }
              />
            ) : (
              // In 1v1 mode, show the enemy's board
              <Board
                currentPlayer={currentPlayer}
                enemyBoard={boards[currentPlayer === 1 ? 2 : 1]}
                isEnemyView={true}
                onAttack={
                  currentPlayer === 1
                    ? (x, y) => handleAttack(2, x, y)
                    : (x, y) => handleAttack(1, x, y)
                }
              />
            )}
          </div>
        </div>
      )}

      <Controls
        phase={phase}
        onReset={restartGame}
        onToggleOrientation={toggleOrientation}
        onStartBattle={startBattle}
        onRandomize={randomizeShips}
        orientation={orientation}
        allShipsPlaced={checkAllShipsPlaced()}
        currentPlayer={currentPlayer}
      />
    </div>
  );
};

export default Game;
