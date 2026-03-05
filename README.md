# Kalpriti Frontend

Production-ready React frontend for **Kalpriti**, an AI-powered website builder platform.

## Stack

- React 18 + Vite
- React Router v6
- Tailwind CSS
- Axios (with interceptors)
- React Hook Form + Zod
- Monaco Editor (`@monaco-editor/react`)
- Stripe Elements
- Prettier (browser formatting)
- Recharts (admin analytics)
- pnpm

## Environment Variables

Create `.env` in project root:

```bash
VITE_API_URL=http://localhost:3000
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
```

## Setup

```bash
pnpm install
pnpm dev
```

Build and preview:

```bash
pnpm build
pnpm preview
```

## Key Routes

### Public/Auth

- `/`
- `/login`
- `/register`
- `/forgot-password`
- `/reset-password/:token`

### Authenticated App

- `/dashboard`
- `/projects`
- `/projects/new`
- `/projects/:id`
- `/projects/:id/settings`
- `/community`
- `/community/:id`
- `/pricing`
- `/profile`
- `/verify-email`

### Admin (Role: `ADMIN`)

- `/admin/transactions`
- `/admin/analytics`

## Phase 3 Extensions

### 1. Advanced Editor System

Implemented in `src/features/editor/`:

- `AdvancedCodeEditor`
- `EditorToolbar`
- `EditorLayout`
- `PreviewPanel`
- `ResizableDivider`
- `ConsolePanel`

Capabilities:

- Syntax highlighting for HTML/CSS/JavaScript
- Automatic language detection with manual override
- Dark/light Monaco theme sync
- Code folding + line numbers
- Read-only mode toggle
- Prettier format action
- `Ctrl+S` / `Cmd+S` shortcut to save version
- Optional debounced auto-save drafts (localStorage)
- Resizable split view (Editor | Preview)
- Fullscreen editor mode
- Sandboxed, debounced iframe preview (500ms)
- Preview console/runtime message capture panel

### 2. Version Diff Comparison

Implemented in `src/features/diff/`:

- `VersionCompareModal`
- `DiffViewer` (Monaco Diff Editor)

Features:

- Select any two versions
- Side-by-side or inline diff mode
- Restore selected version directly from modal

### 3. Admin Transactions Panel

Implemented in `src/features/admin/` + `src/pages/admin/`:

- `AdminDashboard`
- `AdminStatsCards`
- `AdminTransactionsTable`
- `TransactionDetailsModal`
- `StatusBadge`

Features:

- Fetch admin transactions (`GET /payment/admin/transactions`)
- Search/filter/sort
- Client pagination
- Transaction details modal
- Status update with confirmation (`PUT /payment/:id`)
- KPI overview cards
- Sticky header table
- CSV export

### 4. Analytics (Admin)

Implemented in `src/features/analytics/` and `src/components/charts/`:

- `AnalyticsOverview`
- `RevenueTrendChart`
- `PaymentStatusChart`

Notes:

- Route is lazy loaded
- Metrics are computed from admin transaction data

### 5. Security and Role Handling

- Centralized permission utilities in `src/utils/permissions.js`
- Generic `RoleBasedRoute` guard in `src/routes/RoleBasedRoute.jsx`
- `AdminRoute` built on top of role-based guard
- Admin nav links hidden for non-admin users
- Unauthorized users redirected to `/unauthorized`

## Source Structure (extended)

```text
src/
  api/
  components/
    common/
    ui/
    table/
    charts/
  contexts/
  features/
    auth/
    chat/
    payments/
    projects/
    versions/
    editor/
    admin/
    analytics/
    diff/
  hooks/
  layouts/
  pages/
    auth/
    projects/
    admin/
  routes/
  utils/
  assets/
```

## Backend Assumptions

- Base URL: `http://localhost:3000`
- JWT in HTTP-only cookies
- Frontend always uses `withCredentials: true`
