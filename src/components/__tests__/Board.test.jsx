import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Board from "../Board";

const createBoard = (size = 3, fill = null) =>
  Array.from({ length: size }, () => Array.from({ length: size }, () => fill));

describe("Board", () => {
  it("shows ship segments when viewing own fleet", () => {
    const board = createBoard();
    board[0][0] = "S";

    render(<Board currentPlayer={1} enemyBoard={board} isEnemyView={false} />);

    const shipCell = screen.getByRole("img", { name: /ship segment/i });
    expect(shipCell).toBeInTheDocument();
    expect(shipCell.className).toContain("from-slate-600");
  });

  it("hides ship segments when viewing enemy waters and allows attacks", async () => {
    const board = createBoard();
    board[0][0] = "S";
    const onAttack = vi.fn();
    const user = userEvent.setup();

    render(
      <Board
        currentPlayer={1}
        enemyBoard={board}
        isEnemyView
        onAttack={onAttack}
      />
    );

    expect(screen.queryByRole("img", { name: /ship segment/i })).toBeNull();

    const cells = screen.getAllByRole("button", { name: /water cell/i });
    await user.click(cells[0]);
    expect(onAttack).toHaveBeenCalledWith(0, 0);
  });
});
