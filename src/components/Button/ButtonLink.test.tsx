import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ButtonLink } from "./ButtonLink";

describe("ButtonLink", () => {
  it("renders an accessible link with href", () => {
    render(<ButtonLink href="/register">Criar conta</ButtonLink>);

    expect(screen.getByRole("link", { name: "Criar conta" })).toHaveAttribute(
      "href",
      "/register",
    );
  });

  it("accepts custom className without losing button styles", () => {
    render(
      <ButtonLink href="/login" className="custom-class">
        Voltar
      </ButtonLink>,
    );

    const link = screen.getByRole("link", { name: "Voltar" });

    expect(link).toHaveClass("custom-class");
    expect(link).toHaveClass("inline-flex");
  });
});
