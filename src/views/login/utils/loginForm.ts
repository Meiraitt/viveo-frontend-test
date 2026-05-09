export type LoginForm = {
  email: string;
  password: string;
};

export type LoginErrors = Partial<Record<keyof LoginForm, string>>;
export type LoginTouchedFields = Partial<Record<keyof LoginForm, boolean>>;

export const initialLoginForm: LoginForm = {
  email: "",
  password: "",
};

const validateLoginField = (field: keyof LoginForm, value: string) => {
  if (field === "email") {
    if (!value.trim()) {
      return "Informe seu e-mail.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return "Informe um e-mail valido.";
    }

    return undefined;
  }

  if (!value) {
    return "Informe sua senha.";
  }

  if (value.length < 6) {
    return "A senha deve ter pelo menos 6 caracteres.";
  }

  return undefined;
};

export const validateVisibleLoginField = (
  field: keyof LoginForm,
  value: string,
) => {
  if (!value.trim()) {
    return undefined;
  }

  return validateLoginField(field, value);
};

export const validateLoginForm = (form: LoginForm) => {
  const errors: LoginErrors = {};
  const emailError = validateLoginField("email", form.email);
  const passwordError = validateLoginField("password", form.password);

  if (emailError) {
    errors.email = emailError;
  }

  if (passwordError) {
    errors.password = passwordError;
  }

  return errors;
};
