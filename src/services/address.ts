import type { Address } from "@/types/address";

type BrasilApiCepResponse = {
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
};

type BrasilApiErrorResponse = {
  name?: string;
  message?: string;
  type?: string;
  errors?: Array<{
    message?: string;
    service?: string;
  }>;
};

const BRASIL_API_CEP_URL = process.env.NEXT_PUBLIC_BRASIL_API_CEP_URL;

const onlyNumbers = (value: string) => value.replace(/\D/g, "");

const normalizeAddress = (data: BrasilApiCepResponse): Address => ({
  cep: data.cep,
  state: data.state,
  city: data.city,
  neighborhood: data.neighborhood,
  street: data.street,
});

const getBrasilApiErrorMessage = (data: BrasilApiErrorResponse) => {
  if (
    data.type === "service_error" ||
    data.name === "CepPromiseError" ||
    data.message === "Todos os serviços de CEP retornaram erro."
  ) {
    return "CEP nao encontrado ou indisponivel no momento.";
  }

  if (data.errors?.[0]?.message) {
    return data.errors[0].message;
  }

  if (data.message) {
    return data.message;
  }

  return "Nao foi possivel consultar o CEP.";
};

export const fetchAddressByCep = async (cep: string): Promise<Address> => {
  if (!BRASIL_API_CEP_URL) {
    throw new Error("BrasilAPI base URL nao configurada.");
  }

  const normalizedCep = onlyNumbers(cep);

  if (normalizedCep.length !== 8) {
    throw new Error("Informe um CEP com 8 digitos.");
  }

  const response = await fetch(`${BRASIL_API_CEP_URL}/${normalizedCep}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(getBrasilApiErrorMessage(data));
  }

  return normalizeAddress(data);
};
