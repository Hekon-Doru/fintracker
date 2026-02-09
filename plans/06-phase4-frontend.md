# Phase 4: Frontend Development (React + TypeScript)

[← Back to Master Plan](../PLAN.md)

---

## 🎯 Phase Objective

Build a complete, type-safe React application with proper state management, routing, and reusable components.

**Estimated Duration:** 4-5 weeks

---

## 4.1 Type Definitions

### Create TypeScript Interfaces

**Location:** `src/types/`

#### `types/user.ts`
```typescript
export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
```

#### `types/account.ts`
```typescript
export type AccountType = 'checking' | 'savings' | 'credit' | 'cash' | 'investment';

export interface Account {
  id: number;
  user_id: number;
  name: string;
  type: AccountType;
  balance: number;
  currency: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
```

#### `types/category.ts`
```typescript
export type CategoryType = 'income' | 'expense';

export interface Category {
  id: number;
  user_id: number | null;
  name: string;
  type: CategoryType;
  icon: string | null;
  color: string | null;
  parent_id: number | null;
  created_at: string;
  updated_at: string;
  children?: Category[];
}
```

#### `types/transaction.ts`
```typescript
export type TransactionType = 'income' | 'expense' | 'transfer';

export interface Transaction {
  id: number;
  user_id: number;
  account_id: number;
  category_id: number;
  type: TransactionType;
  amount: number;
  description: string | null;
  transaction_date: string;
  notes: string | null;
  tags: string[] | null;
  created_at: string;
  updated_at: string;
  account?: Account;
  category?: Category;
}
```

#### `types/budget.ts`
```typescript
export type BudgetPeriod = 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface Budget {
  id: number;
  user_id: number;
  category_id: number | null;
  amount: number;
  period: BudgetPeriod;
  start_date: string;
  end_date: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  category?: Category;
  utilization?: {
    spent: number;
    percentage: number;
    remaining: number;
  };
}
```

#### `types/goal.ts`
```typescript
export type GoalStatus = 'active' | 'completed' | 'cancelled';

export interface Goal {
  id: number;
  user_id: number;
  name: string;
  target_amount: number;
  current_amount: number;
  deadline: string | null;
  status: GoalStatus;
  created_at: string;
  updated_at: string;
  progress_percentage: number;
}
```

#### `types/api.ts`
```typescript
export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}
```

**Tasks:**
- [ ] Create all type definition files
- [ ] Export types from `src/types/index.ts`
- [ ] Ensure strict type checking passes

---

## 4.2 API Service Layer

### Axios Configuration

**File:** `src/services/api.ts`

- [ ] Create axios instance with base URL
- [ ] Add request interceptor to attach auth token
- [ ] Add response interceptor for error handling
- [ ] Implement token refresh logic
- [ ] Handle 401 (unauthorized) responses

### Service Modules

#### `services/authService.ts`
```typescript
export const authService = {
  register: (data: RegisterData): Promise<AuthResponse>
  login: (credentials: LoginCredentials): Promise<AuthResponse>
  logout: (): Promise<void>
  getCurrentUser: (): Promise<User>
  forgotPassword: (email: string): Promise<void>
  resetPassword: (data: ResetPasswordData): Promise<void>
}
```

#### `services/accountService.ts`
```typescript
export const accountService = {
  getAll: (): Promise<Account[]>
  getById: (id: number): Promise<Account>
  create: (data: CreateAccountData): Promise<Account>
  update: (id: number, data: UpdateAccountData): Promise<Account>
  delete: (id: number): Promise<void>
}
```

#### `services/transactionService.ts`
```typescript
export const transactionService = {
  getAll: (filters?: TransactionFilters): Promise<PaginatedResponse<Transaction>>
  getById: (id: number): Promise<Transaction>
  create: (data: CreateTransactionData): Promise<Transaction>
  update: (id: number, data: UpdateTransactionData): Promise<Transaction>
  delete: (id: number): Promise<void>
  import: (file: File): Promise<void>
}
```

#### `services/budgetService.ts`
```typescript
export const budgetService = {
  getAll: (): Promise<Budget[]>
  getById: (id: number): Promise<Budget>
  create: (data: CreateBudgetData): Promise<Budget>
  update: (id: number, data: UpdateBudgetData): Promise<Budget>
  delete: (id: number): Promise<void>
}
```

#### `services/categoryService.ts`
```typescript
export const categoryService = {
  getAll: (type?: CategoryType): Promise<Category[]>
  create: (data: CreateCategoryData): Promise<Category>
  update: (id: number, data: UpdateCategoryData): Promise<Category>
  delete: (id: number): Promise<void>
}
```

#### `services/goalService.ts`
```typescript
export const goalService = {
  getAll: (): Promise<Goal[]>
  getById: (id: number): Promise<Goal>
  create: (data: CreateGoalData): Promise<Goal>
  update: (id: number, data: UpdateGoalData): Promise<Goal>
  delete: (id: number): Promise<void>
  contribute: (id: number, amount: number): Promise<Goal>
}
```

#### `services/dashboardService.ts`
```typescript
export const dashboardService = {
  getData: (): Promise<DashboardData>
}
```

#### `services/reportService.ts`
```typescript
export const reportService = {
  getIncomeExpense: (start: string, end: string): Promise<IncomeExpenseReport>
  getByCategory: (start: string, end: string): Promise<CategoryReport[]>
  getTrends: (start: string, end: string, interval: string): Promise<TrendData[]>
  export: (type: string, start: string, end: string): Promise<Blob>
}
```

**Tasks:**
- [ ] Implement all service modules
- [ ] Add proper error handling
- [ ] Type all responses correctly
- [ ] Test API integration

---

## 4.3 State Management

### Auth Context

**File:** `src/contexts/AuthContext.tsx`

- [ ] Create AuthContext with user state
- [ ] Provide login, logout, register methods
- [ ] Store token in localStorage
- [ ] Implement token persistence on page reload
- [ ] Export useAuth hook

### Theme Context

**File:** `src/contexts/ThemeContext.tsx`

- [ ] Create ThemeContext for dark/light mode
- [ ] Persist theme preference in localStorage
- [ ] Export useTheme hook

### React Query Setup

**File:** `src/App.tsx` or `src/main.tsx`

- [ ] Set up QueryClientProvider
- [ ] Configure default query options
- [ ] Add React Query DevTools (development)

### Custom Hooks

#### `hooks/useAuth.ts`
- [ ] Export auth context hook
- [ ] Provide type-safe access to auth state

#### `hooks/useTransactions.ts`
```typescript
export const useTransactions = (filters?: TransactionFilters) => {
  const query = useQuery(['transactions', filters], () => 
    transactionService.getAll(filters)
  );
  const createMutation = useMutation(transactionService.create);
  const updateMutation = useMutation(transactionService.update);
  const deleteMutation = useMutation(transactionService.delete);
  // ...
}
```

#### `hooks/useAccounts.ts`
- [ ] Fetch accounts with React Query
- [ ] Provide CRUD mutations
- [ ] Invalidate cache on changes

#### `hooks/useBudgets.ts`
- [ ] Fetch budgets with React Query
- [ ] Calculate utilization on client
- [ ] Provide CRUD mutations

#### `hooks/useCategories.ts`
- [ ] Fetch categories (with caching)
- [ ] Filter by type (income/expense)

#### `hooks/useDashboard.ts`
- [ ] Fetch dashboard data
- [ ] Refetch on interval (optional)

**Tasks:**
- [ ] Create all custom hooks
- [ ] Implement optimistic updates
- [ ] Add loading and error states
- [ ] Configure cache invalidation

---

## 4.4 Routing

### Route Configuration

**File:** `src/App.tsx`

```typescript
const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/register',
    element: <RegisterPage />
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/dashboard',
        element: <DashboardPage />
      },
      {
        path: '/transactions',
        element: <TransactionsPage />
      },
      {
        path: '/transactions/new',
        element: <NewTransactionPage />
      },
      {
        path: '/transactions/:id',
        element: <TransactionDetailPage />
      },
      {
        path: '/accounts',
        element: <AccountsPage />
      },
      {
        path: '/budgets',
        element: <BudgetsPage />
      },
      {
        path: '/goals',
        element: <GoalsPage />
      },
      {
        path: '/reports',
        element: <ReportsPage />
      },
      {
        path: '/settings',
        element: <SettingsPage />
      }
    ]
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
]);
```

### Protected Route Component

**File:** `src/components/common/ProtectedRoute.tsx`

- [ ] Check authentication status
- [ ] Redirect to login if not authenticated
- [ ] Render children if authenticated

**Tasks:**
- [ ] Set up React Router
- [ ] Create all route components
- [ ] Implement protected routes
- [ ] Add 404 page
- [ ] Test navigation

---

## 4.5 Component Development

### Common Components

**Location:** `src/components/common/`

#### Basic Components
- [ ] `Button.tsx` - Reusable button with variants
- [ ] `Input.tsx` - Text input with label and error
- [ ] `Select.tsx` - Dropdown select
- [ ] `Textarea.tsx` - Multi-line text input
- [ ] `Checkbox.tsx` - Checkbox with label
- [ ] `Radio.tsx` - Radio button
- [ ] `Card.tsx` - Container card
- [ ] `Modal.tsx` - Dialog/modal component
- [ ] `LoadingSpinner.tsx` - Loading indicator
- [ ] `Alert.tsx` - Alert/notification banner
- [ ] `Badge.tsx` - Small label/badge
- [ ] `Avatar.tsx` - User avatar
- [ ] `Tooltip.tsx` - Tooltip component

#### Advanced Components
- [ ] `Table.tsx` - Data table with sorting
- [ ] `Pagination.tsx` - Pagination controls
- [ ] `DatePicker.tsx` - Date selection (use library or custom)
- [ ] `AmountInput.tsx` - Formatted currency input
- [ ] `ConfirmDialog.tsx` - Confirmation modal
- [ ] `Toast.tsx` - Toast notification system
- [ ] `EmptyState.tsx` - Empty state placeholder
- [ ] `ErrorBoundary.tsx` - Error boundary wrapper

### Layout Components

**Location:** `src/components/layouts/`

- [ ] `AppLayout.tsx` - Main app layout with sidebar
- [ ] `AuthLayout.tsx` - Layout for login/register pages
- [ ] `Sidebar.tsx` - Navigation sidebar
- [ ] `Navbar.tsx` - Top navigation bar
- [ ] `Footer.tsx` - Footer component

### Feature Components

#### Authentication (`src/components/features/auth/`)
- [ ] `LoginForm.tsx` - Login form with validation
- [ ] `RegisterForm.tsx` - Registration form
- [ ] `ForgotPasswordForm.tsx` - Password reset request
- [ ] `ResetPasswordForm.tsx` - New password form

#### Dashboard (`src/components/features/dashboard/`)
- [ ] `DashboardOverview.tsx` - Main dashboard
- [ ] `AccountsWidget.tsx` - Accounts summary
- [ ] `RecentTransactionsWidget.tsx` - Recent transactions list
- [ ] `BudgetStatusWidget.tsx` - Budget progress bars
- [ ] `SpendingChartWidget.tsx` - Spending visualization
- [ ] `GoalProgressWidget.tsx` - Goals progress
- [ ] `QuickStats.tsx` - Quick statistics cards

#### Transactions (`src/components/features/transactions/`)
- [ ] `TransactionList.tsx` - Paginated transaction list
- [ ] `TransactionForm.tsx` - Add/edit transaction
- [ ] `TransactionFilters.tsx` - Filter controls
- [ ] `TransactionItem.tsx` - Single transaction row
- [ ] `TransactionDetails.tsx` - Detailed view
- [ ] `ImportTransactions.tsx` - CSV import interface
- [ ] `TransactionCard.tsx` - Transaction card (mobile)

#### Accounts (`src/components/features/accounts/`)
- [ ] `AccountList.tsx` - List of accounts
- [ ] `AccountCard.tsx` - Account card with balance
- [ ] `AccountForm.tsx` - Add/edit account
- [ ] `AccountDetails.tsx` - Detailed account view

#### Budgets (`src/components/features/budgets/`)
- [ ] `BudgetList.tsx` - List of budgets
- [ ] `BudgetCard.tsx` - Budget card with progress
- [ ] `BudgetForm.tsx` - Add/edit budget
- [ ] `BudgetProgress.tsx` - Progress bar with details

#### Goals (`src/components/features/goals/`)
- [ ] `GoalList.tsx` - List of goals
- [ ] `GoalCard.tsx` - Goal card with progress
- [ ] `GoalForm.tsx` - Add/edit goal
- [ ] `ContributeToGoal.tsx` - Contribution modal

#### Reports (`src/components/features/reports/`)
- [ ] `ReportDashboard.tsx` - Main reports view
- [ ] `IncomeExpenseChart.tsx` - Income vs expense chart
- [ ] `SpendingByCategoryChart.tsx` - Category breakdown
- [ ] `TrendChart.tsx` - Trends over time
- [ ] `ExportOptions.tsx` - Export controls

#### Settings (`src/components/features/settings/`)
- [ ] `ProfileSettings.tsx` - User profile
- [ ] `CategoryManagement.tsx` - Manage categories
- [ ] `PreferencesSettings.tsx` - App preferences

---

## 4.6 Utilities

**Location:** `src/utils/`

- [ ] `formatCurrency.ts` - Format numbers as currency
- [ ] `formatDate.ts` - Date formatting utilities
- [ ] `calculateTotal.ts` - Calculate transaction totals
- [ ] `colorUtils.ts` - Color manipulation
- [ ] `validation.ts` - Common validation functions
- [ ] `apiErrorHandler.ts` - Error message extraction
- [ ] `downloadFile.ts` - File download helper
- [ ] `debounce.ts` - Debounce utility
- [ ] `classNames.ts` - Conditional class names helper

---

## 4.7 Forms & Validation

### React Hook Form Integration

- [ ] Create reusable form wrapper
- [ ] Implement field error display
- [ ] Add loading states during submission

### Zod Schemas

**Location:** `src/schemas/`

- [ ] `authSchemas.ts` - Login, register validation
- [ ] `transactionSchemas.ts` - Transaction validation
- [ ] `accountSchemas.ts` - Account validation
- [ ] `budgetSchemas.ts` - Budget validation
- [ ] `goalSchemas.ts` - Goal validation

Example:
```typescript
export const transactionSchema = z.object({
  account_id: z.number().positive(),
  category_id: z.number().positive(),
  type: z.enum(['income', 'expense', 'transfer']),
  amount: z.number().positive(),
  description: z.string().optional(),
  transaction_date: z.string(),
  notes: z.string().optional(),
});
```

**Tasks:**
- [ ] Create all validation schemas
- [ ] Integrate with React Hook Form
- [ ] Display validation errors
- [ ] Test form submissions

---

## 4.8 Styling & Design System

### Tailwind Configuration

**File:** `tailwind.config.js`

- [ ] Configure custom colors (primary, secondary, etc.)
- [ ] Set up custom spacing scale
- [ ] Add custom font families
- [ ] Configure dark mode
- [ ] Add custom animations

### Design Tokens

**File:** `src/styles/tokens.css`

- [ ] Define CSS custom properties for colors
- [ ] Define typography scale
- [ ] Define spacing system
- [ ] Define border radius values
- [ ] Set up dark mode variables

### Responsive Design
- [ ] Mobile-first approach (320px+)
- [ ] Tablet breakpoint (768px+)
- [ ] Desktop breakpoint (1024px+)
- [ ] Large desktop (1280px+)

### Dark Mode
- [ ] Implement theme toggle
- [ ] Test all components in dark mode
- [ ] Ensure proper contrast ratios

### Accessibility
- [ ] Use semantic HTML
- [ ] Add ARIA labels where needed
- [ ] Ensure keyboard navigation
- [ ] Test with screen reader
- [ ] Maintain color contrast (WCAG AA)

**Tasks:**
- [ ] Complete Tailwind configuration
- [ ] Define design tokens
- [ ] Test responsive layouts
- [ ] Implement dark mode
- [ ] Verify accessibility

---

## 🧪 Testing Tasks

### Unit Tests
- [ ] Test utility functions
- [ ] Test custom hooks
- [ ] Test form validation

### Component Tests
- [ ] Test common components (Button, Input, etc.)
- [ ] Test form components
- [ ] Test feature components

### Integration Tests
- [ ] Test user flows (login, create transaction)
- [ ] Test form submissions with API mocks
- [ ] Test navigation

---

## 🎯 Phase 4 Completion Criteria

- ✅ All TypeScript types defined
- ✅ API service layer complete
- ✅ Routing configured
- ✅ All components implemented
- ✅ Forms with validation working
- ✅ Styling and design system complete
- ✅ Responsive on all screen sizes
- ✅ Dark mode functional
- ✅ Accessibility verified
- ✅ Tests passing (>70% coverage)

---

[← Previous: Phase 3 Backend](05-phase3-backend.md) | [Back to Master Plan](../PLAN.md) | [Next: Phase 5 Security →](07-phase5-security.md)
