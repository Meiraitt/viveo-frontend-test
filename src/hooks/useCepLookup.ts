"use client";

import { fetchAddressByCep } from "@/services/address";
import type { Address } from "@/types/address";
import { useState } from "react";

export const useCepLookup = () => {
  const [address, setAddress] = useState<Address | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const lookupCep = async (cep: string) => {
    setIsLoading(true);
    setError("");

    try {
      const addressByCep = await fetchAddressByCep(cep);
      setAddress(addressByCep);

      return addressByCep;
    } catch (lookupError) {
      setAddress(null);
      setError(
        lookupError instanceof Error
          ? lookupError.message
          : "Nao foi possivel consultar o CEP.",
      );

      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const clearCepLookup = () => {
    setAddress(null);
    setError("");
  };

  return {
    address,
    cepLookupError: error,
    isCepLoading: isLoading,
    lookupCep,
    clearCepLookup,
  };
};
