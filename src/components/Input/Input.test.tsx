import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Input } from "./Input";

describe("Input", () => {
  it("associates label with the input", () => {
    render(<Input label="E-mail" name="email" />);

    expect(screen.getByLabelText("E-mail")).toHaveAttribute("name", "email");
  });

  it("shows an error message and marks input as invalid", () => {
    render(
      <Input
        label="E-mail"
        name="email"
        error="Informe um e-mail valido."
      />,
    );

    const input = screen.getByLabelText("E-mail");
    const message = screen.getByText("Informe um e-mail valido.");

    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-describedby", "email-description");
    expect(message).toHaveAttribute("id", "email-description");
  });

  it("shows helper text when there is no error", () => {
    render(
      <Input
        label="CEP"
        name="cep"
        helperText="Consultando CEP..."
      />,
    );

    expect(screen.getByText("Consultando CEP...")).toBeInTheDocument();
    expect(screen.getByLabelText("CEP")).toHaveAttribute(
      "aria-describedby",
      "cep-description",
    );
  });

  it("calls onChange when user types", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<Input label="Nome" name="fullName" onChange={handleChange} />);

    await user.type(screen.getByLabelText("Nome"), "Ana");

    expect(handleChange).toHaveBeenCalled();
  });
});
