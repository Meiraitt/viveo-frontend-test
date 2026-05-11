# Viveo Front-end Technical Test

Responsive authentication flow built with Next.js, React and Tailwind CSS for the Viveo front-end assessment.

The project includes:

- responsive login screen;
- responsive user registration screen;
- CEP lookup integration with BrasilAPI;
- reusable base components;
- unit tests for components and form utilities;
- E2E test covering the main user flow.

## Stack

| Tool | Version | Purpose |
| --- | --- | --- |
| Next.js | `16.2.6` | App Router, routing and build tooling |
| React | `19.2.4` | UI library |
| React DOM | `19.2.4` | React rendering for the browser |
| TypeScript | `^5` | Static typing |
| Tailwind CSS | `^4` | Utility-first styling |
| ESLint | `^9` | Static code analysis |
| Vitest | `^4.1.5` | Unit test runner |
| Testing Library React | `^16.3.2` | Component testing utilities |
| Testing Library Jest DOM | `^6.9.1` | DOM-specific test matchers |
| Testing Library User Event | `^14.6.1` | User interaction simulation |
| jsdom | `^29.1.1` | DOM environment for unit tests |
| Playwright | `^1.59.1` | E2E testing |

## Requirements

- Node.js compatible with Next.js 16.
- npm.

## Environment

Create a local environment file from the example:

```bash
cp .env.example .env
```

The project expects:

```env
NEXT_PUBLIC_BRASIL_API_CEP_URL=https://brasilapi.com.br/api/cep/v2
```

This URL is public and is used by the browser to query BrasilAPI. No private token is required.

## Running Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

The root route redirects to `/login`.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Next.js development server |
| `npm run build` | Creates a production build |
| `npm run start` | Starts the production server after build |
| `npm run lint` | Runs ESLint |
| `npm run test` | Runs unit tests with Vitest |
| `npm run test:e2e` | Runs the Playwright E2E suite |

## Architecture

```txt
src/
├── app/                  # Next.js routes, root layout and route-level files
│   ├── login/            # Login route that renders the login view
│   ├── register/         # Register route that renders the register view
│   ├── globals.css       # Global styles, Tailwind theme tokens and CSS variables
│   ├── layout.tsx        # Root HTML structure and metadata
│   └── page.tsx          # Initial redirect to the login flow
├── assets/               # Project-owned visual assets imported by components/views
├── components/           # Reusable base components with colocated unit tests
│   ├── Button/           # Button, ButtonLink and shared button styles
│   ├── Card/             # Reusable surface component
│   └── Input/            # Accessible input with label, error and helper text
├── hooks/                # Global reusable hooks
│   └── useCepLookup.ts   # CEP lookup state, loading and error orchestration
├── services/             # HTTP calls and API response normalization
│   └── address.ts        # BrasilAPI CEP request and error mapping
├── test/                 # Unit test setup
│   └── setup.ts          # jest-dom matchers for Vitest
├── types/                # Shared TypeScript contracts
│   └── address.ts        # Internal Address type used by the app
└── views/                # Screen-level UI, hooks and screen-specific utilities
    ├── login/            # Login view, hook and form validation utilities
    └── register/         # Register view, hook and form validation utilities
```

Route files in `src/app` stay small and import complete views from `src/views`. Base components do not know screen-specific rules. Form rules live close to each view in `utils`, while HTTP details stay in `services`.

## API Choice

The project uses BrasilAPI's CEP endpoint because it fits naturally into a user registration flow.

```txt
GET https://brasilapi.com.br/api/cep/v2/{cep}
```

When a valid CEP is typed, the registration form looks up the address and fills:

- street;
- neighborhood;
- city;
- state.

The address remains editable after the lookup, so the user can correct or complete it manually.

## Technical Decisions

- Code identifiers are written in English, while user-facing text is written in Portuguese.
- Login and registration are implemented as views, not directly inside route files.
- Form state and handlers are kept in view hooks.
- Validation and formatting rules are pure functions in view-level `utils`.
- Base components are reusable and receive behavior through props.
- BrasilAPI responses are normalized in the service layer before reaching the view.
- The CEP lookup is mocked in the E2E test to avoid network flakiness.
- Visual style uses a dark cyberpunk direction with purple, magenta and cyan accents.

## Testing

Run unit tests:

```bash
npm run test
```

The unit suite covers:

- `Button`;
- `ButtonLink`;
- `Input`;
- `Card`;
- login form validation utilities;
- register form validation and formatting utilities.

Run E2E tests:

```bash
npm run test:e2e
```

The E2E suite covers:

```txt
login -> register -> fill form -> mock CEP lookup -> validate address autofill -> submit
```

The Playwright test intercepts the BrasilAPI request and returns a controlled mocked address.

## Final Validation

Before submitting, run:

```bash
npm run lint
npm run test
npm run test:e2e
npm run build
```
