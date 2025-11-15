# 🚢 Battleship Game

A modern, interactive Battleship game built with React and Vite. Play against a friend in 1v1 mode or challenge an AI opponent with three difficulty levels. Features a beautiful, responsive UI with smooth animations and intuitive controls.

![React](https://img.shields.io/badge/React-19.1.1-blue)
![Vite](https://img.shields.io/badge/Vite-7.1.7-purple)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.17-cyan)
![Vitest](https://img.shields.io/badge/Vitest-4.0.8-green)

## ✨ Features

- **Two Game Modes**

  - 🎮 **1v1 Mode**: Play against a friend locally
  - 🤖 **1vAI Mode**: Challenge an AI opponent with three difficulty levels

- **AI Difficulty Levels**

  - 🟢 **Easy**: Random attacks - perfect for beginners
  - 🟡 **Medium**: Targets adjacent cells after hits - moderate challenge
  - 🔴 **Hard**: Smart targeting with pattern recognition - expert level

- **Game Features**

  - 📊 Real-time scoreboard tracking wins across multiple games (But the data is not stored in a database, reloading page causes data loss)
  - ⌨️ Keyboard shortcuts for faster gameplay (R to rotate, Enter to start)
  - 🎲 Random ship placement option
  - 📱 Fully responsive design for desktop and mobile

- **Technical Features**
  - ✅ Comprehensive test coverage with Vitest
  - 🎨 Modern UI with TailwindCSS
  - ⚡ Fast development with Vite
  - 🔍 ESLint for code quality

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** (recommended) or **yarn** package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/EnesGjurgjiali/battleship-game.git
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:5173` (or the port shown in terminal)

## 🎮 How to Play

### Game Setup

1. **Choose Game Mode**

   - Select **1v1** to play against a friend
   - Select **vs AI** to play against the computer
   - If playing vs AI, choose your preferred difficulty level

2. **Place Your Ships**

   - Click on the board to place each ship
   - Press **R** or click the orientation button to rotate ships (horizontal/vertical)
   - Use **Randomize Fleet** to automatically place all ships
   - Place all 5 ships:
     - Carrier (5 cells)
     - Battleship (4 cells)
     - Cruiser (3 cells)
     - Submarine (3 cells)
     - Destroyer (2 cells)

<!-- 3. **Begin Battle**
   - Click **Begin Battle** or press **Enter** when all ships are placed (It will auto-start if you don't :D)
   - In 1v1 mode, Player 2 will place their ships next
   - In 1vAI mode, the AI automatically places its ships -->

### Gameplay

- **Your Turn**: Click on the enemy board to attack
- **Hit**: Red marker appears - you've hit an enemy ship!
- **Miss**: Gray marker appears - try again!
- **Win**: Sink all enemy ships to win the game
- **Scoreboard**: Track your wins across multiple games

### Keyboard Shortcuts

- **R**: Rotate ship orientation (placement phase)

## 🧪 Testing

### Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Test Coverage

- ✅ Component rendering and interactions
- ✅ Game logic and state management
- ✅ AI player behavior across all difficulty levels
- ✅ User interactions and keyboard shortcuts
- ✅ Edge cases and error handling

**Current Test Status**: 41 tests passing across 7 test files

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── __tests__/          # Component tests
│   │   │   ├── Board.test.jsx
│   │   │   ├── Cell.test.jsx
│   │   │   ├── Controls.test.jsx
│   │   │   ├── GameModeSelector.test.jsx
│   │   │   ├── Scoreboard.test.jsx
│   │   │   └── StatusPanel.test.jsx
│   │   ├── Board.jsx           # Game board display
│   │   ├── Cell.jsx             # Individual cell component
│   │   ├── Controls.jsx         # Game controls (buttons)
│   │   ├── Game.jsx             # Main game logic
│   │   ├── GameModeSelector.jsx # Mode and difficulty selector
│   │   ├── Scoreboard.jsx       # Score tracking
│   │   ├── ShipPlacement.jsx    # Ship placement interface
│   │   └── StatusPanel.jsx      # Game status display
│   ├── utils/
│   │   ├── __tests__/
│   │   │   └── aiPlayer.test.js # AI logic tests
│   │   └── aiPlayer.js          # AI player implementation
│   ├── App.jsx
│   └── main.jsx
├── package.json
├── vite.config.js
└── README.md
```

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start development server

# Build
npm run build        # Build for production
npm run preview      # Preview production build

# Testing
npm test             # Run tests once
npm test -- --watch  # Run tests in watch mode

# Linting
npm run lint         # Check code quality
```

## 🏗️ Technologies Used

- **React 19.1.1** - UI framework
- **Vite 7.1.7** - Build tool and dev server
- **TailwindCSS 4.1.17** - Styling
- **Vitest 4.0.8** - Testing framework
- **React Testing Library** - Component testing
- **ESLint** - Code linting

## 🐛 Known Issues / Future Improvements

- [ ] Add animations for ship placement
- [ ] Implement online multiplayer
- [ ] Add game history/replay feature
- [ ] Add customizable board sizes
- [ ] Add ship customization options


