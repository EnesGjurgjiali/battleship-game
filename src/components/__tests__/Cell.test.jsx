import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Cell from "../Cell";

describe("Cell", () => {
  it("renders default water state when value is empty", () => {
    render(<Cell value={null} />);

    const cell = screen.getByRole("img", { name: /water cell/i });
    expect(cell.className).toContain("from-blue-600");
  });

  it("applies ship styling when value is S", () => {
    render(<Cell value="S" />);

    const cell = screen.getByRole("img", { name: /ship segment/i });
    expect(cell.className).toContain("from-slate-600");
  });

  it("shows hit indicator when value is H", () => {
    render(<Cell value="H" />);

    const indicator = screen.getByRole("presentation", { name: /hit marker/i });
    expect(indicator).toBeInTheDocument();
  });

  it("fires click handler when provided", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    const { getByRole } = render(<Cell value={null} onClick={handleClick} />);
    const cell = getByRole("button", { name: /water cell/i });

    await user.click(cell);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
