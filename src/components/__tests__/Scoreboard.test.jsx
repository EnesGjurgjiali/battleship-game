import { render, screen } from "@testing-library/react";
import Scoreboard from "../Scoreboard";

describe("Scoreboard", () => {
  it("displays player scores and highlights current player", () => {
    render(
      <Scoreboard scores={{ p1: 3, p2: 5 }} currentPlayer={2} totalGames={8} />
    );

    expect(screen.getByText(/player 1/i)).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText(/total battles:/i)).toHaveTextContent("8");

    const playerTwoScore = screen.getByText("5");
    expect(playerTwoScore.className).toContain("text-yellow-300");
  });
});
