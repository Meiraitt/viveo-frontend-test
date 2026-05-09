"use client";

import { useMemo, useState } from "react";
import type { SubmitEventHandler } from "react";
import {
  initialLoginForm,
  validateLoginForm,
  validateVisibleLoginField,
} from "../utils/loginForm";
import type {
  LoginErrors,
  LoginForm,
  LoginTouchedFields,
} from "../utils/loginForm";

export const useLoginView = () => {
  const [form, setForm] = useState(initialLoginForm);
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
