"use client";

import { useMemo, useState } from "react";
import type { SubmitEventHandler } from "react";

type LoginForm = {
  email: string;
  password: string;
};

type LoginErrors = Partial<Record<keyof LoginForm, string>>;
type LoginTouchedFields = Partial<Record<keyof LoginForm, boolean>>;

const initialForm: LoginForm = {
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

const validateVisibleLoginField = (field: keyof LoginForm, value: string) => {
  if (!value.trim()) {
    return undefined;
  }

  return validateLoginField(field, value);
};

const validateLoginForm = (form: LoginForm) => {
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

export const useLoginView = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [touchedFields, setTouchedFields] = useState<LoginTouchedFields>({});
  const [successMessage, setSuccessMessage] = useState("");

  const formValidationErrors = useMemo(() => validateLoginForm(form), [form]);
  const isSubmitDisabled = Object.keys(formValidationErrors).length > 0;

  const handleChange = (field: keyof LoginForm, value: string) => {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));

    if (touchedFields[field]) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [field]: validateVisibleLoginField(field, value),
      }));
    }

    setSuccessMessage("");
  };

  const handleBlur = (field: keyof LoginForm) => {
    setTouchedFields((currentTouchedFields) => ({
      ...currentTouchedFields,
      [field]: true,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: validateVisibleLoginField(field, form[field]),
    }));
  };

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setTouchedFields({
      email: true,
      password: true,
    });

    const validationErrors = validateLoginForm(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setSuccessMessage("Login validado localmente.");
  };

  return {
    form,
    errors,
    successMessage,
    isSubmitDisabled,
    handleChange,
    handleBlur,
    handleSubmit,
  };
};
