import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Controls from "../Controls";

describe("Controls", () => {
  const baseProps = {
    onStartBattle: vi.fn(),
    onReset: vi.fn(),
    onRandomize: vi.fn(),
    onToggleOrientation: vi.fn(),
    currentPlayer: 1,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders placement controls and toggles orientation with keyboard", async () => {
    const user = userEvent.setup();

    render(
      <Controls
        {...baseProps}
        phase="placement"
        orientation="horizontal"
        allShipsPlaced={false}
      />
    );

    expect(
      screen.getByRole("button", { name: /horizontal/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /randomize fleet/i })
    ).toBeEnabled();
    expect(
      screen.getByRole("button", { name: /begin battle/i })
    ).toBeDisabled();

    await user.keyboard("r");
    expect(baseProps.onToggleOrientation).toHaveBeenCalled();
  });

  it("starts battle with Enter key when ships are placed", () => {
    render(
      <Controls
        {...baseProps}
        phase="placement"
        orientation="vertical"
        allShipsPlaced
      />
    );

    fireEvent.keyDown(window, { key: "Enter" });
    expect(baseProps.onStartBattle).toHaveBeenCalled();
  });

  it("renders new game button outside placement phase", () => {
    render(
      <Controls
        {...baseProps}
        phase="battle"
        orientation="horizontal"
        allShipsPlaced={false}
      />
    );

    expect(
      screen.getByRole("button", { name: /new game/i })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /randomize fleet/i })
    ).not.toBeInTheDocument();
  });
});
