import { describe, expect, it } from "vitest";
import {
  initialLoginForm,
  validateLoginForm,
  validateVisibleLoginField,
} from "./loginForm";

describe("loginForm utils", () => {
  it("validates required login fields", () => {
    expect(validateLoginForm(initialLoginForm)).toEqual({
      email: "Informe seu e-mail.",
      password: "Informe sua senha.",
    });
  });

  it("validates email format and password length", () => {
    expect(
      validateLoginForm({
        email: "invalid-email",
        password: "123",
      }),
    ).toEqual({
      email: "Informe um e-mail valido.",
      password: "A senha deve ter pelo menos 6 caracteres.",
    });
  });

  it("does not show visible error for empty fields before submit", () => {
    expect(validateVisibleLoginField("email", "")).toBeUndefined();
    expect(validateVisibleLoginField("password", "")).toBeUndefined();
  });

  it("returns no errors for valid login data", () => {
    expect(
      validateLoginForm({
        email: "user@example.com",
        password: "123456",
      }),
    ).toEqual({});
  });
});
