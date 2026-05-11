# Tasks - Avaliacao Tecnica Viveo Front-end

Este arquivo organiza o desenvolvimento em entregas commitaveis. Cada task deve gerar uma parte funcional, ser revisada, testada e commitada antes da proxima.

## Objetivo

Construir uma aplicacao responsiva em Next.js, React e Tailwind com:

- tela de login;
- tela de cadastro de usuarios;
- chamada para uma API open-source;
- testes unitarios em componentes base;
- teste E2E cobrindo o fluxo principal;
- README com instrucoes e decisoes tecnicas.

## Arquitetura

Seguir o `ARCHITECTURE.md`:

- `src/app` apenas para rotas, layouts, metadata e providers;
- `src/views` para telas completas e seus hooks/componentes especificos;
- `src/components` para componentes base reutilizaveis;
- `src/services` para chamadas HTTP;
- `src/hooks` para hooks globais, especialmente dados de API;
- `src/types` para contratos compartilhados;
- `src/utils` para funcoes puras compartilhadas.

## API escolhida

Usaremos a BrasilAPI, especialmente o endpoint de CEP:

```txt
GET https://brasilapi.com.br/api/cep/v2/{cep}
```

Motivo:

- faz sentido dentro de uma tela de cadastro de usuario;
- permite preencher endereco automaticamente a partir do CEP;
- demonstra loading, erro, validacao e normalizacao de dados;
- tem contexto brasileiro, mais coerente que usuarios aleatorios.

## Fluxo alvo

O usuario acessa a tela de login, navega para cadastro, preenche dados pessoais e informa um CEP. A aplicacao consulta a BrasilAPI, completa os campos de endereco e permite finalizar o cadastro com feedback visual.

## Convencao de commits

- Uma task por commit.
- Antes de commitar, rodar as validacoes indicadas na task.
- Marcar a task como `done` somente depois do commit.
- Mensagem sugerida pode ser ajustada, mas deve refletir a entrega.

## Tasks

### - [x] Task 01 - Login funcional e responsivo

Status: done

Commit sugerido:

```txt
feat: add responsive login screen
```

Escopo:

- criar a rota `src/app/login/page.tsx`;
- ajustar `src/app/page.tsx` para encaminhar a experiencia inicial para login;
- criar `src/views/login`;
- implementar a tela `Login`;
- criar componentes base necessarios para a tela, como `Button`, `ButtonLink`, `Input` e um componente simples de superficie se necessario;
- criar export central em `src/components/index.ts`;
- implementar validacao basica de email e senha;
- exibir mensagens de erro acessiveis;
- adicionar link para a futura tela de cadastro;
- revisar `metadata` e `lang` do layout raiz;
- remover sobras do template inicial do Next.js que afetem a experiencia de login.

Criterios de revisao:

- ao abrir a aplicacao, o usuario chega ao fluxo de login;
- a tela funciona bem em mobile e desktop;
- a UI ja deve sair revisada em espacamento, hierarquia, contraste e responsividade;
- os componentes base nao conhecem regras especificas de login;
- `page.tsx` importa a view em vez de concentrar JSX complexo;
- labels, foco visivel, estados de hover, erro e disabled estao bem tratados;
- textos nao quebram nem sobrepoem elementos em larguras pequenas;
- nao ha imports ou arquivos mortos.

Validacao antes do commit:

```bash
npm run lint
```

### - [x] Task 02 - Cadastro de usuarios sem integracao externa

Status: done

Commit sugerido:

```txt
feat: add responsive user registration screen
```

Escopo:

- criar a rota `src/app/register/page.tsx`;
- criar `src/views/register`;
- implementar a tela `Register`;
- criar hook de view para estado e handlers se o formulario crescer;
- adicionar campos de dados pessoais;
- adicionar campos de endereco, incluindo CEP, rua, bairro, cidade e estado;
- manter os campos de endereco preenchiveis manualmente nesta etapa;
- implementar validacao basica de campos obrigatorios;
- adicionar link de volta para login;
- reaproveitar componentes base criados na Task 01;
- revisar a experiencia responsiva durante a implementacao, sem deixar polimento para uma task separada.

Criterios de revisao:

- a tela de cadastro e acessivel a partir do login;
- a UI deve ser responsiva e confortavel em formularios longos;
- espacamento, hierarquia visual, contraste e quebras de texto devem estar revisados;
- campos devem ter labels claros, mensagens de erro e estados consistentes;
- logica de formulario deve ficar fora de componentes base;
- ainda nao deve haver chamada para API externa nesta task.

Validacao antes do commit:

```bash
npm run lint
```

### - [ ] Task 03 - Integracao com BrasilAPI no cadastro

Status: in_progress

Commit sugerido:

```txt
feat: integrate cep lookup with BrasilAPI
```

Escopo:

- criar `src/types/address.ts`;
- criar `src/services/address.ts`;
- criar hook global para consulta de CEP em `src/hooks`;
- conectar a consulta de CEP na tela de cadastro;
- normalizar o retorno da BrasilAPI para tipos internos em ingles;
- preencher rua, bairro, cidade e estado quando o CEP for encontrado;
- tratar CEP invalido, CEP nao encontrado, erro de rede e loading;
- preservar a possibilidade de ajuste manual do endereco apos o preenchimento.

Criterios de revisao:

- service deve cuidar apenas de fetch, parse e erro;
- hook global deve expor nomes claros para dados, loading, erro e acao de consulta;
- view deve orquestrar a experiencia sem conhecer detalhes do endpoint externo;
- estados de carregamento e erro devem ser visiveis e nao bloquear o formulario inteiro;
- a integracao deve fazer sentido para o fluxo de cadastro.

Validacao antes do commit:

```bash
npm run lint
```

### - [ ] Task 04 - Testes unitarios dos componentes base

Status: pending

Commit sugerido:

```txt
test: add unit tests for base components
```

Escopo:

- instalar e configurar ferramenta de teste unitario se necessario;
- criar setup de testes em `src/test`, conforme arquitetura;
- testar `Button`;
- testar `ButtonLink`;
- testar `Input`;
- testar componente de superficie/card caso ele exista;
- adicionar script de teste no `package.json`.

Criterios de revisao:

- testes devem validar comportamento relevante, nao apenas renderizacao vazia;
- cobrir estados como disabled, erro, label acessivel e clique quando aplicavel;
- testes devem ficar proximos dos componentes base ou seguir o padrao definido no setup;
- scripts devem ser simples para o avaliador rodar.

Validacao antes do commit:

```bash
npm run lint
npm run test
```

### - [ ] Task 05 - Teste E2E do fluxo principal

Status: pending

Commit sugerido:

```txt
test: add e2e coverage for auth flow
```

Escopo:

- instalar e configurar Playwright se necessario;
- criar pasta `e2e`;
- testar o fluxo de login para cadastro;
- preencher formulario de cadastro;
- mockar ou interceptar a chamada da BrasilAPI para um CEP conhecido;
- validar autopreenchimento de endereco;
- validar feedback final de cadastro;
- adicionar script E2E no `package.json`.

Criterios de revisao:

- o teste deve cobrir o fluxo mais importante do desafio;
- a chamada externa deve ser controlada no teste para evitar flakiness;
- seletores devem priorizar acessibilidade, como labels e roles;
- o teste deve rodar localmente com comando documentado.

Validacao antes do commit:

```bash
npm run lint
npm run test
npm run test:e2e
```

### - [ ] Task 06 - README, decisoes tecnicas e validacao final

Status: pending

Commit sugerido:

```txt
docs: document setup and project decisions
```

Escopo:

- atualizar `README.md`;
- explicar como instalar dependencias;
- explicar como rodar o projeto localmente;
- explicar como rodar lint, testes unitarios, E2E e build;
- documentar a escolha da BrasilAPI;
- documentar a organizacao por camadas;
- documentar decisoes de usabilidade;
- revisar se login e cadastro seguem consistencia visual e responsiva;
- rodar validacao final completa.

Criterios de revisao:

- README deve permitir que o avaliador rode o projeto sem adivinhar comandos;
- decisoes tecnicas devem ser objetivas;
- projeto deve estar pronto para entrega;
- `tasks.md` deve refletir o status final das tasks.

Validacao antes do commit:

```bash
npm run lint
npm run test
npm run test:e2e
npm run build
```

## Ordem de execucao

1. [x] Task 01 - Login funcional e responsivo
2. [x] Task 02 - Cadastro de usuarios sem integracao externa
3. [ ] Task 03 - Integracao com BrasilAPI no cadastro
4. [ ] Task 04 - Testes unitarios dos componentes base
5. [ ] Task 05 - Teste E2E do fluxo principal
6. [ ] Task 06 - README, decisoes tecnicas e validacao final
