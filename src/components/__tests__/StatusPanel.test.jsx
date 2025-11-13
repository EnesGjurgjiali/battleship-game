import { render, screen } from "@testing-library/react";
import StatusPanel from "../StatusPanel";

describe("StatusPanel", () => {
  it("shows placement message during placement phase", () => {
    render(
      <StatusPanel
        phase="placement"
        currentPlayer={1}
        winner={null}
        lastAction=""
      />
    );

    expect(
      screen.getByText(/player 1, deploy your fleet/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/phase:/i)).toHaveTextContent("placement");
  });

  it("indicates hit feedback during battle", () => {
    render(
      <StatusPanel
        phase="battle"
        currentPlayer={2}
        winner={null}
        lastAction="Hit!"
      />
    );

    expect(screen.getByText(/hit! target destroyed/i)).toBeInTheDocument();
    expect(
      screen.queryByText(/player 2's turn - select target/i)
    ).not.toBeInTheDocument();
  });

  it("announces the winner during game over phase", () => {
    render(
      <StatusPanel
        phase="gameOver"
        currentPlayer={1}
        winner={2}
        lastAction="Hit!"
      />
    );

    expect(screen.getByText(/player 2 victorious/i)).toBeInTheDocument();
    expect(screen.queryByText(/phase:/i)).not.toBeInTheDocument();
  });
});
