"use client";

import { useCepLookup } from "@/hooks/useCepLookup";
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
  const { cepLookupError, isCepLoading, lookupCep, clearCepLookup } =
    useCepLookup();
  const [form, setForm] = useState(initialRegisterForm);
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [touchedFields, setTouchedFields] = useState<RegisterTouchedFields>({});
  const [lastSearchedCep, setLastSearchedCep] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const formValidationErrors = useMemo(
    () => validateRegisterForm(form),
    [form],
  );
  const isSubmitDisabled = Object.keys(formValidationErrors).length > 0;

  const handleCepLookup = async (cep: string, currentForm: RegisterForm) => {
    const normalizedCep = cep.replace(/\D/g, "");
    setLastSearchedCep(normalizedCep);

    const address = await lookupCep(normalizedCep);

    if (!address) {
      return;
    }

    const updatedForm = {
      ...currentForm,
      street: address.street,
      neighborhood: address.neighborhood,
      city: address.city,
      state: address.state,
    };

    setForm(updatedForm);

    setErrors((currentErrors) => ({
      ...currentErrors,
      street: validateVisibleRegisterField(
        "street",
        updatedForm.street,
        updatedForm,
      ),
      neighborhood: validateVisibleRegisterField(
        "neighborhood",
        updatedForm.neighborhood,
        updatedForm,
      ),
      city: validateVisibleRegisterField("city", updatedForm.city, updatedForm),
      state: validateVisibleRegisterField(
        "state",
        updatedForm.state,
        updatedForm,
      ),
    }));
  };

  const handleChange = (field: keyof RegisterForm, value: string) => {
    const formattedValue = formatRegisterFieldValue(field, value);
    const updatedForm = {
      ...form,
      [field]: formattedValue,
    };
    const normalizedCep = updatedForm.cep.replace(/\D/g, "");

    if (field === "cep") {
      clearCepLookup();
    }

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

    const cepError = validateVisibleRegisterField("cep", updatedForm.cep, updatedForm);

    if (
      field === "cep" &&
      normalizedCep.length === 8 &&
      !cepError &&
      normalizedCep !== lastSearchedCep
    ) {
      void handleCepLookup(updatedForm.cep, updatedForm);
    }

    setSuccessMessage("");
  };

  const handleBlur = (field: keyof RegisterForm) => {
    setTouchedFields((currentTouchedFields) => ({
      ...currentTouchedFields,
      [field]: true,
    }));

    const fieldError = validateVisibleRegisterField(field, form[field], form);

    setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: fieldError,
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
    cepLookupError,
    successMessage,
    isCepLoading,
    isSubmitDisabled,
    handleChange,
    handleBlur,
    handleSubmit,
  };
};
