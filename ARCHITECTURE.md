# Front-end Architecture Guide

Este documento descreve a arquitetura usada neste projeto para servir como referencia em projetos futuros com Next.js, TypeScript, Tailwind, React Query e Zustand.

## Objetivo da Arquitetura

A ideia principal e separar responsabilidades de forma simples:

- `app` cuida de rotas, layouts e route handlers.
- `services` cuida apenas das chamadas HTTP.
- `hooks` globais conectam services com React Query.
- `views` concentram telas, componentes especificos de tela, hooks especificos e utils especificos.
- `components` guarda componentes base reutilizaveis.
- `stores` guarda estados globais com Zustand.
- `types` guarda tipos compartilhados.
- `utils` guarda funcoes puras compartilhadas.

## Estrutura Base

```txt
src/
├── app/                      # rotas, layouts e route handlers do Next.js
│   ├── api/                  # BFF interno da aplicacao
│   ├── (private)/            # grupo de rotas privadas
│   ├── login/                # rota publica
│   ├── layout.tsx            # layout raiz
│   └── providers.tsx         # providers globais
├── assets/                   # imagens e icons internos
│   ├── icons/
│   └── images/
├── components/               # componentes base reutilizaveis
├── constants/                # constantes compartilhadas
├── hooks/                    # hooks globais e hooks de React Query
├── services/                 # funcoes de fetch por contexto
├── stores/                   # stores Zustand
├── test/                     # setup dos testes
├── types/                    # tipos compartilhados
├── utils/                    # utilitarios globais
└── views/                    # telas e logica especifica de cada tela
```

## Separacao por Camadas

### `src/app`

Usado somente para a estrutura do App Router:

- pages;
- layouts;
- metadata;
- redirects;
- route handlers em `api`;
- grupos de rota, como `(private)`.

Evite colocar muita regra de negocio diretamente em arquivos de page. A page deve importar a view:

```tsx
import { Login } from "@/views/login";

export default function LoginPage() {
  return <Login />;
}
```

### `src/services`

Services sao responsaveis por chamadas HTTP e normalizacao basica de erro.

Exemplo de regra:

- `services/auth.ts` cuida de login/logout.
- `services/products.ts` cuida de listagem/filtros de produtos.

O service nao deve conhecer componente, estado visual ou JSX.

```ts
export const listProducts = async (filters: ProductFilters) => {
  const response = await fetch("/api/products");

  if (!response.ok) {
    throw new Error("Unable to load products.");
  }

  return response.json();
};
```

### `src/hooks`

Hooks globais conectam services com React Query ou encapsulam comportamento reutilizavel.

Exemplos usados:

- `useLogin`;
- `useLogout`;
- `useProducts`;
- `useDebouncedValue`.

Padrao:

```ts
export const useProducts = (filters: ProductFilters) => {
  const query = useQuery({
    queryKey: ["products", filters],
    queryFn: () => listProducts(filters),
  });

  return {
    products: query.data ?? [],
    isProductsLoading: query.isLoading,
    productsError: query.error,
    refetchProducts: query.refetch,
  };
};
```

Esse padrao deixa o componente importar apenas o que precisa, com nomes claros.

### `src/views`

Views representam telas completas ou fluxos de tela.

Estrutura sugerida:

```txt
views/
└── products/
    ├── Products.tsx
    ├── components/
    │   ├── ProductCard.tsx
    │   └── ProductDetailModal.tsx
    ├── hooks/
    │   └── useProductsView.ts
    ├── utils/
    │   └── sortProducts.ts
    └── index.ts
```

Regra pratica:

- `Products.tsx` deve ficar mais visual/declarativo.
- `hooks/useProductsView.ts` guarda estado e handlers da tela.
- `components/` guarda componentes que pertencem somente a essa view.
- `utils/` guarda funcoes auxiliares especificas dessa view.

Isso evita componentes grandes demais.

### `src/components`

Componentes base reutilizaveis ficam aqui. Eles nao devem conhecer regras especificas de uma tela.

Estrutura por componente:

```txt
components/
└── Button/
    ├── Button.tsx
    ├── ButtonLink.tsx
    ├── buttonStyles.ts
    ├── Button.test.tsx
    └── index.ts
```

Vantagens:

- componente, estilos auxiliares e testes ficam juntos;
- import fica limpo;
- facilita mover ou reutilizar em outro projeto.

Export central:

```ts
export { Button } from "./Button";
export { Input } from "./Input";
export { Modal } from "./Modal";
```

Uso:

```tsx
import { Button, Input } from "@/components";
```

## Componentes Base

### Button

Responsavel por botoes reutilizaveis da aplicacao.

Recursos:

- variants;
- tamanhos;
- estado disabled;
- `className` para ajustes locais;
- foco visivel;
- cursor pointer.

Exemplo:

```tsx
<Button type="submit" isFullWidth>
  Login
</Button>
```

Para links com aparencia de botao, foi criado `ButtonLink`, reaproveitando `buttonStyles.ts`.

```tsx
<ButtonLink href="/login">
  Voltar para login
</ButtonLink>
```

### Input

Responsavel por campos reutilizaveis de formulario.

Recursos:

- `label` acessivel;
- `startIcon`;
- estado de erro;
- borda vermelha quando invalido;
- suporte a `className`;
- suporte a props nativas de input via `InputHTMLAttributes`.

Exemplo:

```tsx
<Input
  label="Usuario"
  name="user"
  placeholder="Usuario"
  startIcon={<UserIcon />}
/>
```

### Card

Componente base para superficies simples.

Uso esperado:

- cards genericos;
- blocos de conteudo;
- composicoes simples.

Nao deve conter regra especifica de produto, login ou qualquer tela.

### Modal

Modal base usando Radix Dialog.

Recursos:

- foco preso;
- Esc fecha;
- overlay;
- `aria-*` controlado pelo Radix;
- title/description acessiveis.

Exemplo:

```tsx
<Modal
  isOpen={isOpen}
  onOpenChange={setIsOpen}
  title="Produto"
  description="Detalhes do produto"
>
  Conteudo
</Modal>
```

### Skeleton

Componente para estados de loading.

Uso esperado:

- primeira carga;
- carregamento incremental;
- placeholders visuais.

## Estado Global com Zustand

Use Zustand para estado compartilhado real, nao para todo estado local.

Exemplos:

- dados nao sensiveis da sessao;
- favoritos persistidos;
- preferencias globais.

Evite colocar no Zustand:

- estado temporario de formulario simples;
- estado usado por apenas um componente;
- dados que React Query ja gerencia melhor.

## React Query

Use React Query para dados vindos de API:

- cache;
- loading;
- erro;
- retry;
- refetch;
- invalidacao futura.

Padrao usado:

```txt
services/products.ts -> useProducts.ts -> views/products/hooks/useProductsView.ts -> Products.tsx
```

Fluxo:

1. `service` faz o fetch.
2. `hook` global chama o service com React Query.
3. `hook` da view combina dados, filtros, estado visual e handlers.
4. componente renderiza.

## Route Handlers como BFF

Os route handlers em `src/app/api` funcionam como um BFF interno.

Vantagens:

- esconder URL base da API externa;
- guardar token em cookie HTTP-only;
- enviar Bearer token no servidor;
- normalizar resposta externa para tipos internos em ingles;
- centralizar tratamento de `401`.

Exemplo:

```txt
client -> /api/products -> external API
```

## Nomenclatura

Padrao adotado:

- codigo em ingles;
- texto visivel ao usuario em portugues;
- nomes de arquivos/componentes em PascalCase para componentes;
- hooks sempre com `use`;
- services por contexto: `auth.ts`, `products.ts`;
- tipos por contexto: `auth.ts`, `product.ts`.

## Quando Criar um Hook de View

Crie um hook em `views/<view>/hooks` quando o componente comecar a acumular:

- muitos `useState`;
- muitos handlers;
- `useMemo`/`useEffect`;
- regras de filtro/ordenacao;
- controle de modal;
- integracao com stores.

Exemplo:

```txt
Products.tsx
└── useProductsView.ts
```

O componente fica mais declarativo e o hook concentra comportamento.

## Quando Criar Utils

Use `src/utils` para funcoes globais:

- `formatCurrency`;
- `formatCurrentDate`.

Use `views/<view>/utils` para funcoes especificas:

- `sortProducts`;
- `validation` do login.

## Testes

Padrao usado:

- teste unitario ao lado do componente base;
- E2E fora de `src`, em `e2e/`.

Exemplo:

```txt
components/Button/Button.test.tsx
components/Input/Input.test.tsx
components/Modal/Modal.test.tsx
e2e/login-products.spec.ts
```

## Checklist para Replicar em Outro Projeto

- [ ] Criar `src/app/providers.tsx`.
- [ ] Criar `src/components` com componentes base.
- [ ] Criar `src/services` por contexto de API.
- [ ] Criar `src/hooks` para React Query.
- [ ] Criar `src/views/<view>` para cada tela.
- [ ] Criar `src/stores` apenas para estado global real.
- [ ] Criar `src/types` para contratos compartilhados.
- [ ] Criar `src/utils` para helpers globais.
- [ ] Manter pages pequenas, importando views.
- [ ] Separar hooks especificos dentro de cada view quando a tela crescer.
