import { describe, expect, it } from "vitest";
import {
  formatRegisterFieldValue,
  initialRegisterForm,
  validateRegisterForm,
  validateVisibleRegisterField,
} from "./registerForm";

const validRegisterForm = {
  fullName: "Ana Maria",
  email: "ana@example.com",
  phone: "(11) 99999-9999",
  password: "123456",
  confirmPassword: "123456",
  cep: "01310-100",
  street: "Avenida Paulista",
  number: "1000",
  complement: "",
  neighborhood: "Bela Vista",
  city: "Sao Paulo",
  state: "SP",
};

describe("registerForm utils", () => {
  it("formats fields with register rules", () => {
    expect(formatRegisterFieldValue("fullName", "Ana123 Silva")).toBe(
      "Ana Silva",
    );
    expect(formatRegisterFieldValue("phone", "11999999999abc")).toBe(
      "(11) 99999-9999",
    );
    expect(formatRegisterFieldValue("cep", "01310100abc")).toBe("01310-100");
    expect(formatRegisterFieldValue("state", "sp1")).toBe("SP");
  });

  it("validates required register fields", () => {
    expect(validateRegisterForm(initialRegisterForm)).toMatchObject({
      fullName: "Informe seu nome completo.",
      email: "Informe seu e-mail.",
      phone: "Informe seu telefone.",
      password: "Informe seu senha.",
      confirmPassword: "Informe seu confirmacao de senha.",
      cep: "Informe seu CEP.",
    });
  });

  it("validates password confirmation", () => {
    expect(
      validateRegisterForm({
        ...validRegisterForm,
        confirmPassword: "654321",
      }),
    ).toMatchObject({
      confirmPassword: "As senhas precisam ser iguais.",
    });
  });

  it("validates short full name", () => {
    expect(
      validateRegisterForm({
        ...validRegisterForm,
        fullName: "A",
      }),
    ).toMatchObject({
      fullName: "Informe seu nome completo.",
    });
  });

  it("validates phone length", () => {
    expect(
      validateRegisterForm({
        ...validRegisterForm,
        phone: "(11) 9999",
      }),
    ).toMatchObject({
      phone: "Informe um telefone valido.",
    });
  });

  it("validates CEP length", () => {
    expect(
      validateRegisterForm({
        ...validRegisterForm,
        cep: "01310",
      }),
    ).toMatchObject({
      cep: "Informe um CEP com 8 digitos.",
    });
  });

  it("validates state length", () => {
    expect(
      validateRegisterForm({
        ...validRegisterForm,
        state: "S",
      }),
    ).toMatchObject({
      state: "Informe a UF com 2 letras.",
    });
  });

  it("does not show visible error for empty fields before submit", () => {
    expect(
      validateVisibleRegisterField("fullName", "", initialRegisterForm),
    ).toBeUndefined();
  });

  it("returns no errors for valid register data", () => {
    expect(validateRegisterForm(validRegisterForm)).toEqual({});
  });
});
