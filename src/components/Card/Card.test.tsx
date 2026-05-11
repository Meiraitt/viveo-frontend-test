import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Card } from "./Card";

describe("Card", () => {
  it("renders content and accepts custom className", () => {
    render(<Card className="custom-card">Conteudo</Card>);

    const card = screen.getByText("Conteudo");

    expect(card).toHaveClass("custom-card");
    expect(card).toHaveClass("rounded-lg");
  });
});
