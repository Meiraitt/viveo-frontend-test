"use client";

import { Button, ButtonLink, Card, Input } from "@/components";
import Image from "next/image";
import cyberpunkLoginBg from "../../../public/images/cyberpunk-login-bg.png";
import { useLoginView } from "./hooks/useLoginView";

export const Login = () => {
  const {
    form,
    errors,
    successMessage,
    isSubmitDisabled,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useLoginView();

  return (
    <main className="relative flex min-h-screen overflow-hidden bg-background px-4 py-8 text-foreground sm:px-6 lg:px-12">
      <div
        className="absolute inset-y-0 right-0 w-full overflow-hidden"
        aria-hidden="true"
      >
        <Image
          src={cyberpunkLoginBg}
          alt="background image"
          fill
          priority
          sizes="100vw"
          className="absolute right-0 top-0 h-full min-w-full max-w-none object-cover object-right opacity-45 md:opacity-90"
        />
      </div>
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-primary to-transparent" />

      <section className="relative z-10 flex w-full max-w-6xl items-center justify-center lg:justify-start lg:pl-40">
        <Card className="flex w-full max-w-125 flex-col gap-6 p-5 sm:p-7">
          <div className="flex flex-col gap-2">
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent">
              Avaliacao tecnica Viveo
            </p>
            <h2 className="text-2xl font-semibold text-white">
              Entrar na plataforma
            </h2>
          </div>

          <form
            className="flex flex-col gap-8"
            noValidate
            onSubmit={handleSubmit}
          >
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
              label="Senha"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Digite sua senha"
              value={form.password}
              error={errors.password}
              onChange={(event) => handleChange("password", event.target.value)}
              onBlur={() => handleBlur("password")}
            />

            {successMessage ? (
              <p
                className="rounded-md border border-accent/35 bg-accent/10 px-3 py-2 text-sm font-medium text-accent"
                role="status"
              >
                {successMessage}
              </p>
            ) : null}

            <Button
              type="submit"
              size="lg"
              isFullWidth
              disabled={isSubmitDisabled}
            >
              Entrar
            </Button>
          </form>

          <div className="flex flex-col gap-3 border-t border-border pt-5">
            <p className="text-sm text-muted">Ainda nao tem cadastro?</p>
            <ButtonLink href="/register" variant="secondary" isFullWidth>
              Criar conta
            </ButtonLink>
          </div>
        </Card>
      </section>
    </main>
  );
};
