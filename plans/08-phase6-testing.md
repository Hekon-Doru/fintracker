# Phase 6: Testing

[← Back to Master Plan](../PLAN.md)

---

## 🎯 Phase Objective

Implement comprehensive testing across both backend and frontend to ensure code quality, reliability, and maintainability.

**Estimated Duration:** 2 weeks

**Target Coverage:** >80% code coverage

---

## 6.1 Backend Testing (Laravel)

### Unit Tests

**Location:** `tests/Unit/`

#### Services Testing
- [ ] **TransactionService**
  - Test `createTransaction()` - creates transaction and updates balance
  - Test `updateTransaction()` - updates transaction and recalculates balance
  - Test `deleteTransaction()` - deletes transaction and reverts balance
  - Test `importFromCsv()` - parses CSV and creates transactions
  - Test transfer handling (creates two transactions)
  
- [ ] **BudgetService**
  - Test `calculateUtilization()` - correct percentage calculation
  - Test `checkBudgetAlerts()` - alerts at 80% and 100%
  - Test different budget periods (daily, weekly, monthly)
  
- [ ] **ReportService**
  - Test `getIncomeExpenseSummary()` - correct totals
  - Test `getSpendingByCategory()` - correct grouping and percentages
  - Test `getTrends()` - correct data points
  
- [ ] **DashboardService**
  - Test `getDashboardData()` - returns all required data
  - Test performance (should be fast with caching)

#### Model Testing
- [ ] **User Model**
  - Test relationships load correctly
  - Test password hashing mutator
  
- [ ] **Account Model**
  - Test relationships
  - Test scopes (active, byType)
  
- [ ] **Transaction Model**
  - Test relationships
  - Test scopes (income, expense, dateRange)
  - Test tag casting to array
  
- [ ] **Budget Model**
  - Test relationships
  - Test scopes (active, current)
  
- [ ] **Goal Model**
  - Test progress percentage calculation
  - Test isCompleted accessor

#### Utility Testing
- [ ] Test custom validation rules
- [ ] Test helper functions
- [ ] Test observers (balance updates)

---

### Feature Tests

**Location:** `tests/Feature/`

#### Authentication Tests
- [ ] **Registration**
  ```php
  test('user can register with valid data')
  test('user cannot register with invalid email')
  test('user cannot register with weak password')
  test('user cannot register with duplicate email')
  ```

- [ ] **Login**
  ```php
  test('user can login with correct credentials')
  test('user cannot login with wrong password')
  test('user receives auth token on login')
  test('user cannot login with unverified email')
  ```

- [ ] **Logout**
  ```php
  test('user can logout')
  test('token is revoked after logout')
  ```

#### Account API Tests
- [ ] **GET /api/v1/accounts**
  ```php
  test('user can fetch their accounts')
  test('user cannot fetch another user\'s accounts')
  test('returns only active accounts when filtered')
  ```

- [ ] **POST /api/v1/accounts**
  ```php
  test('user can create account')
  test('validation fails with invalid data')
  test('account is created with correct defaults')
  ```

- [ ] **PUT /api/v1/accounts/{id}**
  ```php
  test('user can update their account')
  test('user cannot update another user\'s account')
  ```

- [ ] **DELETE /api/v1/accounts/{id}**
  ```php
  test('user can delete their account')
  test('user cannot delete another user\'s account')
  test('account deletion cascades to transactions')
  ```

#### Transaction API Tests
- [ ] **GET /api/v1/transactions**
  ```php
  test('user can fetch their transactions')
  test('transactions are paginated')
  test('can filter by date range')
  test('can filter by category')
  test('can filter by account')
  test('can filter by type (income/expense)')
  ```

- [ ] **POST /api/v1/transactions**
  ```php
  test('user can create transaction')
  test('account balance is updated on transaction creation')
  test('validation fails with invalid account_id')
  test('validation fails with invalid category_id')
  test('cannot create transaction for another user\'s account')
  ```

- [ ] **PUT /api/v1/transactions/{id}**
  ```php
  test('user can update their transaction')
  test('account balance is recalculated on update')
  test('cannot update another user\'s transaction')
  ```

- [ ] **DELETE /api/v1/transactions/{id}**
  ```php
  test('user can delete their transaction')
  test('account balance is reverted on deletion')
  ```

- [ ] **POST /api/v1/transactions/import**
  ```php
  test('can import transactions from CSV')
  test('invalid CSV format returns error')
  test('validates each transaction in CSV')
  ```

#### Budget API Tests
- [ ] **GET /api/v1/budgets**
  ```php
  test('user can fetch their budgets')
  test('budgets include utilization data')
  ```

- [ ] **POST /api/v1/budgets**
  ```php
  test('user can create budget')
  test('validation enforces valid period')
  ```

- [ ] **GET /api/v1/budgets/{id}**
  ```php
  test('budget shows correct utilization')
  test('utilization calculation is accurate')
  ```

#### Dashboard Tests
- [ ] **GET /api/v1/dashboard**
  ```php
  test('dashboard returns account balances')
  test('dashboard returns recent transactions')
  test('dashboard returns budget status')
  test('dashboard returns goal progress')
  test('dashboard data is cached')
  ```

#### Authorization Tests
- [ ] Test all policy methods
- [ ] Verify users can only access their own resources
- [ ] Test admin roles if implemented

---

### Database Testing
- [ ] Use in-memory SQLite for tests
- [ ] Run migrations before each test
- [ ] Use factories for test data
- [ ] Use DatabaseTransactions trait to rollback changes

---

## 6.2 Frontend Testing (React)

### Unit Tests

**Location:** `src/__tests__/`

#### Utility Functions
- [ ] **formatCurrency.ts**
  ```typescript
  test('formats positive amounts correctly')
  test('formats negative amounts correctly')
  test('handles different currencies')
  test('rounds to 2 decimal places')
  ```

- [ ] **formatDate.ts**
  ```typescript
  test('formats dates in correct format')
  test('handles invalid dates')
  test('formats relative dates (today, yesterday)')
  ```

- [ ] **calculateTotal.ts**
  ```typescript
  test('calculates transaction totals correctly')
  test('filters by transaction type')
  test('handles empty arrays')
  ```

- [ ] **validation.ts**
  ```typescript
  test('validates email addresses')
  test('validates amounts')
  test('validates dates')
  ```

#### Custom Hooks
- [ ] **useAuth**
  ```typescript
  test('returns user when authenticated')
  test('returns null when not authenticated')
  test('login updates user state')
  test('logout clears user state')
  ```

- [ ] **useTransactions**
  ```typescript
  test('fetches transactions on mount')
  test('creates transaction and invalidates cache')
  test('handles loading state')
  test('handles error state')
  ```

---

### Component Tests

**Location:** `src/components/__tests__/`

#### Common Components
- [ ] **Button.tsx**
  ```typescript
  test('renders with text')
  test('calls onClick when clicked')
  test('applies correct variant class')
  test('shows loading state')
  test('is disabled when disabled prop is true')
  ```

- [ ] **Input.tsx**
  ```typescript
  test('renders with label')
  test('shows error message')
  test('updates value on change')
  test('applies error class when error exists')
  ```

- [ ] **Modal.tsx**
  ```typescript
  test('renders when isOpen is true')
  test('does not render when isOpen is false')
  test('calls onClose when close button clicked')
  test('closes on overlay click')
  ```

- [ ] **Card.tsx**
  ```typescript
  test('renders children')
  test('applies custom className')
  ```

#### Form Components
- [ ] **LoginForm.tsx**
  ```typescript
  test('renders email and password fields')
  test('shows validation errors')
  test('submits with valid data')
  test('calls onLogin with credentials')
  test('shows loading state during submission')
  ```

- [ ] **TransactionForm.tsx**
  ```typescript
  test('renders all required fields')
  test('validates amount is positive')
  test('validates required fields')
  test('submits with valid data')
  test('pre-fills form in edit mode')
  ```

#### Feature Components
- [ ] **TransactionList.tsx**
  ```typescript
  test('renders list of transactions')
  test('shows empty state when no transactions')
  test('calls onDelete when delete clicked')
  test('shows loading spinner while fetching')
  ```

- [ ] **AccountCard.tsx**
  ```typescript
  test('displays account name and balance')
  test('formats balance as currency')
  test('shows account type icon')
  test('applies correct color for account type')
  ```

- [ ] **BudgetProgress.tsx**
  ```typescript
  test('displays budget amount')
  test('shows correct progress percentage')
  test('changes color when over budget')
  test('shows warning at 80% utilization')
  ```

---

### Integration Tests

**Location:** `src/__tests__/integration/`

#### User Flows
- [ ] **Authentication Flow**
  ```typescript
  test('user can register, login, and access dashboard')
  test('user is redirected to login when not authenticated')
  test('user can logout and is redirected to landing page')
  ```

- [ ] **Transaction Flow**
  ```typescript
  test('user can create a transaction')
  test('user can edit a transaction')
  test('user can delete a transaction')
  test('transaction list updates after creation')
  ```

- [ ] **Budget Flow**
  ```typescript
  test('user can create a budget')
  test('budget shows correct utilization')
  test('user receives alert when over budget')
  ```

#### API Integration (with MSW)
- [ ] Mock API responses with Mock Service Worker
- [ ] Test successful API calls
- [ ] Test error handling
- [ ] Test loading states
- [ ] Test optimistic updates

---

### End-to-End Testing

**Tool:** Playwright or Cypress

**Location:** `e2e/` or `cypress/e2e/`

#### Critical User Journeys
- [ ] **Complete Registration and Login**
  ```typescript
  test('new user can register and login')
  ```

- [ ] **Dashboard Interaction**
  ```typescript
  test('user sees dashboard after login')
  test('dashboard displays account balances')
  test('dashboard displays recent transactions')
  ```

- [ ] **Create and Manage Transaction**
  ```typescript
  test('user can create income transaction')
  test('user can create expense transaction')
  test('account balance updates after transaction')
  test('user can edit transaction')
  test('user can delete transaction')
  ```

- [ ] **Budget Management**
  ```typescript
  test('user can create budget')
  test('budget shows in dashboard')
  test('budget progress updates with transactions')
  ```

- [ ] **Reports**
  ```typescript
  test('user can view income/expense report')
  test('user can filter reports by date')
  test('user can export report')
  ```

#### Cross-Browser Testing
- [ ] Test on Chrome
- [ ] Test on Firefox
- [ ] Test on Safari
- [ ] Test on Edge

#### Mobile Testing
- [ ] Test responsive layouts
- [ ] Test mobile navigation
- [ ] Test touch interactions

---

### Accessibility Testing

- [ ] **Keyboard Navigation**
  ```typescript
  test('all interactive elements are keyboard accessible')
  test('tab order is logical')
  test('focus indicators are visible')
  ```

- [ ] **Screen Reader Testing**
  ```typescript
  test('images have alt text')
  test('forms have proper labels')
  test('buttons have descriptive text')
  test('error messages are announced')
  ```

- [ ] **Automated Accessibility Testing**
  - [ ] Use axe-core or jest-axe
  - [ ] Test for WCAG 2.1 AA compliance
  - [ ] Check color contrast ratios
  - [ ] Verify semantic HTML

---

## 📊 Testing Tools & Configuration

### Backend Testing Stack
- **PHPUnit** - Main testing framework
- **Pest** (optional) - Modern PHP testing framework
- **Laravel Factories** - Test data generation
- **DatabaseTransactions** - Automatic rollback

### Frontend Testing Stack
- **Jest** - JavaScript testing framework
- **React Testing Library** - Component testing
- **MSW (Mock Service Worker)** - API mocking
- **Playwright** or **Cypress** - E2E testing
- **jest-axe** - Accessibility testing

---

## 🎯 Testing Best Practices

### General
- [ ] Follow AAA pattern (Arrange, Act, Assert)
- [ ] Write descriptive test names
- [ ] Test one thing per test
- [ ] Keep tests independent
- [ ] Clean up test data

### Backend
- [ ] Use factories for model creation
- [ ] Mock external services
- [ ] Test both success and failure cases
- [ ] Test validation rules
- [ ] Test authorization

### Frontend
- [ ] Test user behavior, not implementation
- [ ] Use user-centric queries (getByRole, getByLabelText)
- [ ] Mock API calls
- [ ] Test loading and error states
- [ ] Test accessibility

---

## 📋 Test Coverage Goals

- [ ] Backend: >80% code coverage
- [ ] Frontend: >70% code coverage
- [ ] All critical paths tested
- [ ] All API endpoints tested
- [ ] All user flows tested
- [ ] Edge cases covered

---

## 🎯 Phase 6 Completion Criteria

- ✅ All unit tests written and passing
- ✅ All feature tests written and passing
- ✅ All component tests written and passing
- ✅ All integration tests written and passing
- ✅ E2E tests for critical flows passing
- ✅ Code coverage meets targets (>80% backend, >70% frontend)
- ✅ Accessibility tests passing
- ✅ CI/CD runs all tests automatically
- ✅ No failing tests in main branch

---

[← Previous: Phase 5 Security](07-phase5-security.md) | [Back to Master Plan](../PLAN.md) | [Next: Phase 7 Deployment →](09-phase7-deployment.md)
