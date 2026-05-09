"use client";

import { useMemo, useState } from "react";
import type { SubmitEventHandler } from "react";
import {
  formatRegisterFieldValue,
  initialRegisterForm,
  validateRegisterForm,
  validateVisibleRegisterField,
} from "../utils/registerForm";
import type {
  RegisterErrors,
  RegisterForm,
  RegisterTouchedFields,
} from "../utils/registerForm";

export const useRegisterView = () => {
  const [form, setForm] = useState(initialRegisterForm);
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [touchedFields, setTouchedFields] = useState<RegisterTouchedFields>({});
  const [successMessage, setSuccessMessage] = useState("");

  const formValidationErrors = useMemo(() => validateRegisterForm(form), [form]);
  const isSubmitDisabled = Object.keys(formValidationErrors).length > 0;

  const handleChange = (field: keyof RegisterForm, value: string) => {
    const formattedValue = formatRegisterFieldValue(field, value);
    const updatedForm = {
      ...form,
      [field]: formattedValue,
    };

    setForm(updatedForm);

    if (touchedFields[field]) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [field]: validateVisibleRegisterField(
          field,
          updatedForm[field],
          updatedForm,
        ),
      }));
    }

    if (
      field === "password" &&
      touchedFields.confirmPassword &&
      updatedForm.confirmPassword
    ) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        confirmPassword: validateVisibleRegisterField(
          "confirmPassword",
          updatedForm.confirmPassword,
          updatedForm,
        ),
      }));
    }

    setSuccessMessage("");
  };

  const handleBlur = (field: keyof RegisterForm) => {
    setTouchedFields((currentTouchedFields) => ({
      ...currentTouchedFields,
      [field]: true,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: validateVisibleRegisterField(field, form[field], form),
    }));
  };

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    setTouchedFields({
      fullName: true,
      email: true,
      phone: true,
      password: true,
      confirmPassword: true,
      cep: true,
      street: true,
      number: true,
      neighborhood: true,
      city: true,
      state: true,
    });

    const validationErrors = validateRegisterForm(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setSuccessMessage("Cadastro validado localmente.");
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
