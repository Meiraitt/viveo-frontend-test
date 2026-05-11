import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("renders as a button with default type button", () => {
    render(<Button>Entrar</Button>);

    expect(screen.getByRole("button", { name: "Entrar" })).toHaveAttribute(
      "type",
      "button",
    );
  });

  it("calls onClick when enabled", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>Entrar</Button>);

    await user.click(screen.getByRole("button", { name: "Entrar" }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <Button disabled onClick={handleClick}>
        Entrar
      </Button>,
    );

    await user.click(screen.getByRole("button", { name: "Entrar" }));

    expect(handleClick).not.toHaveBeenCalled();
  });
});
