"use client";

import cyberpunkRegisterBg from "@/assets/cyberpunk-register-bg.webp";
import { Button, ButtonLink, Card, Input } from "@/components";
import Image from "next/image";
import { useRegisterView } from "./hooks/useRegisterView";

export const Register = () => {
  const {
    form,
    errors,
    cepLookupError,
    successMessage,
    isCepLoading,
    isSubmitDisabled,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useRegisterView();

  return (
    <main className="relative flex min-h-screen overflow-hidden bg-background px-4 py-8 text-foreground sm:px-6 lg:px-12">
      <div
        className="absolute inset-y-0 right-0 w-full overflow-hidden"
        aria-hidden="true"
      >
        <Image
          src={cyberpunkRegisterBg}
          alt="background image"
          fill
          priority
          sizes="100vw"
          className="absolute left-0 top-0 h-full min-w-full max-w-none object-cover object-left opacity-35 md:opacity-70"
        />
      </div>
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-primary to-transparent" />

      <section className="relative z-10 flex w-full items-center justify-center lg:justify-end lg:pr-12">
        <Card className="flex w-full max-w-4xl flex-col gap-6 p-5 sm:p-7">
          <div className="flex flex-col gap-2">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">
              Cadastro Viveo
            </p>
            <h2 className="text-2xl font-semibold text-white">Criar conta</h2>
            <p className="text-sm leading-6 text-muted">
              Preencha seus dados e informe o CEP para completar o endereco.
            </p>
          </div>

          <form
            className="flex flex-col gap-8"
            noValidate
            onSubmit={handleSubmit}
          >
            <fieldset className="grid gap-x-6 gap-y-8 border-0 p-0 sm:grid-cols-2">
              <legend className="sr-only">Dados pessoais</legend>

              <Input
                label="Nome completo"
                name="fullName"
                autoComplete="name"
                placeholder="Seu nome completo"
                value={form.fullName}
                error={errors.fullName}
                onChange={(event) =>
                  handleChange("fullName", event.target.value)
                }
                onBlur={() => handleBlur("fullName")}
              />

              <Input
                label="E-mail"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="voce@empresa.com"
                value={form.email}
                error={errors.email}
                onChange={(event) => handleChange("email", event.target.value)}
                onBlur={() => handleBlur("email")}
              />

              <Input
                label="Telefone"
                name="phone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                placeholder="(11) 99999-9999"
                value={form.phone}
                error={errors.phone}
                onChange={(event) => handleChange("phone", event.target.value)}
                onBlur={() => handleBlur("phone")}
              />

              <div className="hidden sm:block" aria-hidden="true" />

              <Input
                label="Senha"
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder="Minimo de 6 caracteres"
                value={form.password}
                error={errors.password}
                onChange={(event) =>
                  handleChange("password", event.target.value)
                }
                onBlur={() => handleBlur("password")}
              />

              <Input
                label="Confirmar senha"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                placeholder="Repita sua senha"
                value={form.confirmPassword}
                error={errors.confirmPassword}
                onChange={(event) =>
                  handleChange("confirmPassword", event.target.value)
                }
                onBlur={() => handleBlur("confirmPassword")}
              />
            </fieldset>

            <fieldset className="grid gap-x-6 gap-y-9 border-0 p-0 sm:grid-cols-6">
              <legend className="sr-only">Endereco</legend>

              <Input
                label="CEP"
                name="cep"
                inputMode="numeric"
                autoComplete="postal-code"
                placeholder="00000-000"
                value={form.cep}
                error={errors.cep || cepLookupError}
                helperText={isCepLoading ? "Consultando CEP..." : undefined}
                className="sm:col-span-2"
                onChange={(event) => handleChange("cep", event.target.value)}
                onBlur={() => handleBlur("cep")}
              />

              <Input
                label="Rua"
                name="street"
                autoComplete="address-line1"
                placeholder="Nome da rua"
                value={form.street}
                error={errors.street}
                className="sm:col-span-4"
                onChange={(event) => handleChange("street", event.target.value)}
                onBlur={() => handleBlur("street")}
              />

              <Input
                label="Numero"
                name="number"
                autoComplete="address-line2"
                placeholder="123"
                value={form.number}
                error={errors.number}
                className="sm:col-span-2"
                onChange={(event) => handleChange("number", event.target.value)}
                onBlur={() => handleBlur("number")}
              />

              <Input
                label="Complemento"
                name="complement"
                autoComplete="address-line3"
                placeholder="Opcional"
                value={form.complement}
                error={errors.complement}
                className="sm:col-span-4"
                onChange={(event) =>
                  handleChange("complement", event.target.value)
                }
                onBlur={() => handleBlur("complement")}
              />

              <Input
                label="Bairro"
                name="neighborhood"
                placeholder="Seu bairro"
                value={form.neighborhood}
                error={errors.neighborhood}
                className="sm:col-span-2"
                onChange={(event) =>
                  handleChange("neighborhood", event.target.value)
                }
                onBlur={() => handleBlur("neighborhood")}
              />

              <Input
                label="Cidade"
                name="city"
                autoComplete="address-level2"
                placeholder="Sua cidade"
                value={form.city}
                error={errors.city}
                className="sm:col-span-3"
                onChange={(event) => handleChange("city", event.target.value)}
                onBlur={() => handleBlur("city")}
              />

              <Input
                label="UF"
                name="state"
                autoComplete="address-level1"
                placeholder="SP"
                value={form.state}
                error={errors.state}
                className="sm:col-span-1"
                maxLength={2}
                onChange={(event) => handleChange("state", event.target.value)}
                onBlur={() => handleBlur("state")}
              />
            </fieldset>

            {successMessage ? (
              <p
                className="rounded-md border border-accent/35 bg-accent/10 px-3 py-2 text-sm font-medium text-accent"
                role="status"
              >
                {successMessage}
              </p>
            ) : null}

            <div className="flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
              <ButtonLink
                href="/login"
                variant="secondary"
                isFullWidth
                className="sm:w-auto"
              >
                Voltar para login
              </ButtonLink>
              <Button
                type="submit"
                size="lg"
                isFullWidth
                className="sm:w-auto"
                disabled={isSubmitDisabled}
              >
                Criar conta
              </Button>
            </div>
          </form>
        </Card>
      </section>
    </main>
  );
};
