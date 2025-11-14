// AI Player logic with different difficulty levels

const BOARD_SIZE = 10;
const SHIPS = [
  { name: "Carrier", size: 5 },
  { name: "Battleship", size: 4 },
  { name: "Cruiser", size: 3 },
  { name: "Submarine", size: 3 },
  { name: "Destroyer", size: 2 },
];

/**
 * Places all ships randomly on the board
 */
export const placeAIShips = () => {
  const board = Array.from({ length: BOARD_SIZE }, () =>
    Array(BOARD_SIZE).fill(null)
  );

  for (const ship of SHIPS) {
    let placed = false;
    let attempts = 0;

    while (!placed && attempts < 200) {
      const randomX = Math.floor(Math.random() * BOARD_SIZE);
      const randomY = Math.floor(Math.random() * BOARD_SIZE);
      const randomOrientation = Math.random() > 0.5 ? "horizontal" : "vertical";

      // Check if ship fits
      let canPlace = true;
      for (let i = 0; i < ship.size; i++) {
        const row = randomOrientation === "horizontal" ? randomX : randomX + i;
        const col = randomOrientation === "horizontal" ? randomY + i : randomY;
        if (row >= BOARD_SIZE || col >= BOARD_SIZE || board[row][col] === "S") {
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
          board[row][col] = "S";
        }
        placed = true;
      }
      attempts++;
    }
  }

  return board;
};

/**
 * Gets all adjacent cells to a hit
 */
const getAdjacentCells = (x, y, board) => {
  const adjacent = [];
  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  for (const [dx, dy] of directions) {
    const newX = x + dx;
    const newY = y + dy;
    if (
      newX >= 0 &&
      newX < BOARD_SIZE &&
      newY >= 0 &&
      newY < BOARD_SIZE &&
      board[newX][newY] !== "H" &&
      board[newX][newY] !== "M"
    ) {
      adjacent.push([newX, newY]);
    }
  }

  return adjacent;
};

/**
 * Finds all hit cells that haven't been fully explored
 */
const findIncompleteHits = (board) => {
  const incompleteHits = [];
  for (let x = 0; x < BOARD_SIZE; x++) {
    for (let y = 0; y < BOARD_SIZE; y++) {
      if (board[x][y] === "H") {
        const adjacent = getAdjacentCells(x, y, board);
        const hasUnexploredAdjacent = adjacent.some(
          ([ax, ay]) => board[ax][ay] !== "H" && board[ax][ay] !== "M"
        );
        if (hasUnexploredAdjacent) {
          incompleteHits.push([x, y]);
        }
      }
    }
  }
  return incompleteHits;
};

/**
 * Determines the direction of a ship based on hits
 */
const getShipDirection = (hits, board) => {
  if (hits.length < 2) return null;

  const [x1, y1] = hits[0];
  const [x2, y2] = hits[1];

  if (x1 === x2) return "horizontal";
  if (y1 === y2) return "vertical";
  return null;
};

/**
 * Gets cells in the direction of a hit ship
 */
const getDirectionCells = (hit, direction, board) => {
  const [x, y] = hit;
  const cells = [];

  if (direction === "horizontal") {
    // Check left and right
    for (let offset = -1; offset <= 1; offset += 2) {
      let newY = y + offset;
      if (
        newY >= 0 &&
        newY < BOARD_SIZE &&
        board[x][newY] !== "H" &&
        board[x][newY] !== "M"
      ) {
        cells.push([x, newY]);
      }
    }
  } else if (direction === "vertical") {
    // Check up and down
    for (let offset = -1; offset <= 1; offset += 2) {
      let newX = x + offset;
      if (
        newX >= 0 &&
        newX < BOARD_SIZE &&
        board[newX][y] !== "H" &&
        board[newX][y] !== "M"
      ) {
        cells.push([newX, y]);
      }
    }
  }

  return cells;
};

/**
 * Easy AI: Random attacks
 */
const easyAI = (board) => {
  const availableCells = [];
  for (let x = 0; x < BOARD_SIZE; x++) {
    for (let y = 0; y < BOARD_SIZE; y++) {
      if (board[x][y] !== "H" && board[x][y] !== "M") {
        availableCells.push([x, y]);
      }
    }
  }

  if (availableCells.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * availableCells.length);
  return availableCells[randomIndex];
};

/**
 * Medium AI: Targets adjacent cells after a hit, otherwise random
 */
const mediumAI = (board) => {
  const incompleteHits = findIncompleteHits(board);

  if (incompleteHits.length > 0) {
    // Target adjacent cells to hits
    const hit = incompleteHits[0];
    const adjacent = getAdjacentCells(hit[0], hit[1], board);
    if (adjacent.length > 0) {
      const randomAdjacent =
        adjacent[Math.floor(Math.random() * adjacent.length)];
      return randomAdjacent;
    }
  }

  // Fall back to random
  return easyAI(board);
};

/**
 * Hard AI: Smart targeting with pattern recognition
 */
const hardAI = (board) => {
  const incompleteHits = findIncompleteHits(board);

  if (incompleteHits.length > 0) {
    // If we have multiple hits, try to determine direction
    if (incompleteHits.length >= 2) {
      const direction = getShipDirection(incompleteHits, board);
      if (direction) {
        // Target in the direction of the ship
        const directionCells = getDirectionCells(
          incompleteHits[0],
          direction,
          board
        );
        if (directionCells.length > 0) {
          return directionCells[0];
        }
      }
    }

    // Target adjacent to the most recent hit
    const hit = incompleteHits[incompleteHits.length - 1];
    const adjacent = getAdjacentCells(hit[0], hit[1], board);
    if (adjacent.length > 0) {
      // Prioritize cells that are more likely to be part of a ship
      // (prefer cells that have more adjacent unexplored cells)
      adjacent.sort((a, b) => {
        const aAdjacent = getAdjacentCells(a[0], a[1], board).length;
        const bAdjacent = getAdjacentCells(b[0], b[1], board).length;
        return bAdjacent - aAdjacent;
      });
      return adjacent[0];
    }
  }

  // Use a checkerboard pattern for initial attacks (more efficient)
  const checkerboardCells = [];
  const regularCells = [];

  for (let x = 0; x < BOARD_SIZE; x++) {
    for (let y = 0; y < BOARD_SIZE; y++) {
      if (board[x][y] !== "H" && board[x][y] !== "M") {
        if ((x + y) % 2 === 0) {
          checkerboardCells.push([x, y]);
        } else {
          regularCells.push([x, y]);
        }
      }
    }
  }

  // Prefer checkerboard pattern first
  if (checkerboardCells.length > 0) {
    return checkerboardCells[
      Math.floor(Math.random() * checkerboardCells.length)
    ];
  }

  // Fall back to remaining cells
  if (regularCells.length > 0) {
    return regularCells[Math.floor(Math.random() * regularCells.length)];
  }

  return easyAI(board);
};

/**
 * Main AI attack function - selects difficulty and returns attack coordinates
 */
export const getAIAttack = (board, difficulty = "medium") => {
  switch (difficulty) {
    case "easy":
      return easyAI(board);
    case "medium":
      return mediumAI(board);
    case "hard":
      return hardAI(board);
    default:
      return mediumAI(board);
  }
};
