export type RegisterForm = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  cep: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
};

export type RegisterErrors = Partial<Record<keyof RegisterForm, string>>;
export type RegisterTouchedFields = Partial<Record<keyof RegisterForm, boolean>>;

export const initialRegisterForm: RegisterForm = {
  fullName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  cep: "",
  street: "",
  number: "",
  complement: "",
  neighborhood: "",
  city: "",
  state: "",
};

const requiredFields: Array<keyof RegisterForm> = [
  "fullName",
  "email",
  "phone",
  "password",
  "confirmPassword",
  "cep",
  "street",
  "number",
  "neighborhood",
  "city",
  "state",
];

const fieldLabels: Record<keyof RegisterForm, string> = {
  fullName: "nome completo",
  email: "e-mail",
  phone: "telefone",
  password: "senha",
  confirmPassword: "confirmacao de senha",
  cep: "CEP",
  street: "rua",
  number: "numero",
  complement: "complemento",
  neighborhood: "bairro",
  city: "cidade",
  state: "estado",
};

const onlyNumbers = (value: string) => value.replace(/\D/g, "");

const formatFullName = (value: string) =>
  value.replace(/[^a-zA-ZÀ-ÿ\s'-]/g, "");

const formatPhone = (value: string) => {
  const numbers = onlyNumbers(value).slice(0, 11);

  if (numbers.length <= 2) {
    return numbers;
  }

  if (numbers.length <= 7) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  }

  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
};

const formatCep = (value: string) => {
  const numbers = onlyNumbers(value).slice(0, 8);

  if (numbers.length <= 5) {
    return numbers;
  }

  return `${numbers.slice(0, 5)}-${numbers.slice(5)}`;
};

const formatState = (value: string) =>
  value.replace(/[^a-zA-Z]/g, "").slice(0, 2).toUpperCase();

export const formatRegisterFieldValue = (
  field: keyof RegisterForm,
  value: string,
) => {
  if (field === "fullName") {
    return formatFullName(value);
  }

  if (field === "phone") {
    return formatPhone(value);
  }

  if (field === "cep") {
    return formatCep(value);
  }

  if (field === "state") {
    return formatState(value);
  }

  return value;
};

const validateRegisterField = (
  field: keyof RegisterForm,
  value: string,
  form: RegisterForm,
) => {
  if (requiredFields.includes(field) && !value.trim()) {
    return `Informe seu ${fieldLabels[field]}.`;
  }

  if (field === "fullName" && value.trim() && value.trim().length < 3) {
    return "Informe seu nome completo.";
  }

  if (
    field === "email" &&
    value.trim() &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  ) {
    return "Informe um e-mail valido.";
  }

  if (field === "phone" && value.trim() && onlyNumbers(value).length < 10) {
    return "Informe um telefone valido.";
  }

  if (field === "password" && value && value.length < 6) {
    return "A senha deve ter pelo menos 6 caracteres.";
  }

  if (
    field === "confirmPassword" &&
    value &&
    form.password &&
    value !== form.password
  ) {
    return "As senhas precisam ser iguais.";
  }

  if (field === "cep" && value.trim() && onlyNumbers(value).length !== 8) {
    return "Informe um CEP com 8 digitos.";
  }

  if (field === "state" && value.trim() && value.trim().length !== 2) {
    return "Informe a UF com 2 letras.";
  }

  return undefined;
};

export const validateVisibleRegisterField = (
  field: keyof RegisterForm,
  value: string,
  form: RegisterForm,
) => {
  if (!value.trim()) {
    return undefined;
  }

  return validateRegisterField(field, value, form);
};

export const validateRegisterForm = (form: RegisterForm) => {
  const errors: RegisterErrors = {};

  requiredFields.forEach((field) => {
    const fieldError = validateRegisterField(field, form[field], form);

    if (fieldError) {
      errors[field] = fieldError;
    }
  });

  return errors;
};
