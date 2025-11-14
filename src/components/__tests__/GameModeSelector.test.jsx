import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GameModeSelector from "../GameModeSelector";

describe("GameModeSelector", () => {
  const defaultProps = {
    gameMode: "1v1",
    onGameModeChange: vi.fn(),
    aiDifficulty: "medium",
    onDifficultyChange: vi.fn(),
    phase: "placement",
    currentPlayer: 1,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders game mode buttons", () => {
    render(<GameModeSelector {...defaultProps} />);

    expect(screen.getByRole("button", { name: /1 vs 1/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /vs ai/i })).toBeInTheDocument();
  });

  it("highlights selected game mode", () => {
    render(<GameModeSelector {...defaultProps} gameMode="1vAI" />);

    const aiButton = screen.getByRole("button", { name: /vs ai/i });
    expect(aiButton.className).toContain("bg-purple-600");
  });

  it("calls onGameModeChange when 1v1 button is clicked", async () => {
    const user = userEvent.setup();
    const onGameModeChange = vi.fn();

    render(
      <GameModeSelector
        {...defaultProps}
        gameMode="1vAI"
        onGameModeChange={onGameModeChange}
      />
    );

    const button = screen.getByRole("button", { name: /1 vs 1/i });
    await user.click(button);

    expect(onGameModeChange).toHaveBeenCalledWith("1v1");
  });

  it("calls onGameModeChange when vs AI button is clicked", async () => {
    const user = userEvent.setup();
    const onGameModeChange = vi.fn();

    render(
      <GameModeSelector
        {...defaultProps}
        gameMode="1v1"
        onGameModeChange={onGameModeChange}
      />
    );

    const button = screen.getByRole("button", { name: /vs ai/i });
    await user.click(button);

    expect(onGameModeChange).toHaveBeenCalledWith("1vAI");
  });

  it("shows difficulty selector when in 1vAI mode", () => {
    render(<GameModeSelector {...defaultProps} gameMode="1vAI" />);

    expect(screen.getByText(/ai difficulty/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /easy/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /medium/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /hard/i })).toBeInTheDocument();
  });

  it("hides difficulty selector when in 1v1 mode", () => {
    render(<GameModeSelector {...defaultProps} gameMode="1v1" />);

    expect(screen.queryByText(/ai difficulty/i)).not.toBeInTheDocument();
  });

  it("highlights selected difficulty", () => {
    render(
      <GameModeSelector {...defaultProps} gameMode="1vAI" aiDifficulty="hard" />
    );

    const hardButton = screen.getByRole("button", { name: /hard/i });
    expect(hardButton.className).toContain("bg-purple-600");
  });

  it("calls onDifficultyChange when difficulty button is clicked", async () => {
    const user = userEvent.setup();
    const onDifficultyChange = vi.fn();

    render(
      <GameModeSelector
        {...defaultProps}
        gameMode="1vAI"
        aiDifficulty="medium"
        onDifficultyChange={onDifficultyChange}
      />
    );

    const easyButton = screen.getByRole("button", { name: /easy/i });
    await user.click(easyButton);

    expect(onDifficultyChange).toHaveBeenCalledWith("easy");
  });

  it("shows difficulty description", () => {
    render(
      <GameModeSelector {...defaultProps} gameMode="1vAI" aiDifficulty="hard" />
    );

    expect(
      screen.getByText(/smart targeting with pattern recognition/i)
    ).toBeInTheDocument();
  });

  it("does not render when phase is not placement", () => {
    const { container } = render(
      <GameModeSelector {...defaultProps} phase="battle" />
    );

    expect(container.firstChild).toBeNull();
  });

  it("does not render when currentPlayer is not 1", () => {
    const { container } = render(
      <GameModeSelector {...defaultProps} currentPlayer={2} />
    );

    expect(container.firstChild).toBeNull();
  });
});
