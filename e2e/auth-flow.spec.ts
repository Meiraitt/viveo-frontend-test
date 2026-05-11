import { expect, test } from "@playwright/test";

const mockedAddress = {
  cep: "01310100",
  state: "SP",
  city: "Sao Paulo",
  neighborhood: "Bela Vista",
  street: "Avenida Paulista",
};

test("fills registration flow with mocked CEP lookup", async ({ page }) => {
  await page.route("**/cep/v2/**", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(mockedAddress),
    });
  });

  await page.goto("/login");
  await page.getByRole("link", { name: "Criar conta" }).click();

  await expect(page).toHaveURL("/register");
  await expect(
    page.getByRole("heading", { name: "Criar conta" }),
  ).toBeVisible();

  await page.getByLabel("Nome completo").fill("Ana Maria");
  await page.getByLabel("E-mail").fill("ana@example.com");
  await page.getByLabel("Telefone").fill("11999999999");
  await page.getByLabel("Senha", { exact: true }).fill("123456");
  await page.getByLabel("Confirmar senha").fill("123456");
  await page.getByLabel("CEP").fill("01310100");

  await expect(page.getByLabel("CEP")).toHaveValue("01310-100");
  await expect(page.getByLabel("Rua")).toHaveValue(mockedAddress.street);
  await expect(page.getByLabel("Bairro")).toHaveValue(
    mockedAddress.neighborhood,
  );
  await expect(page.getByLabel("Cidade")).toHaveValue(mockedAddress.city);
  await expect(page.getByLabel("UF")).toHaveValue(mockedAddress.state);

  await page.getByLabel("Numero").fill("1000");

  await expect(page.getByRole("button", { name: "Criar conta" })).toBeEnabled();
  await page.getByRole("button", { name: "Criar conta" }).click();

  await expect(page.getByText("Cadastro validado localmente.")).toBeVisible();
});
