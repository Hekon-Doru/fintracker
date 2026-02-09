# Phase 3: Backend Development (Laravel)

[← Back to Master Plan](../PLAN.md)

---

## 🎯 Phase Objective

Implement the complete backend API using Laravel with proper architecture, authentication, and business logic.

**Estimated Duration:** 3-4 weeks

---

## 3.1 Authentication & Authorization

### Laravel Sanctum Setup
- [ ] Publish Sanctum configuration
- [ ] Configure token abilities and expiration
- [ ] Update User model to use HasApiTokens trait

### Authentication Controllers
- [ ] Create `AuthController` in `app/Http/Controllers/Api/`
- [ ] Implement `register()` method
  - Validate user input (Form Request)
  - Hash password
  - Create user
  - Return token
- [ ] Implement `login()` method
  - Validate credentials
  - Attempt authentication
  - Generate and return token
- [ ] Implement `logout()` method
  - Revoke current token
  - Return success response
- [ ] Implement `me()` method (get authenticated user)
- [ ] Password reset endpoints
  - `forgotPassword()` - Send reset link
  - `resetPassword()` - Update password

### Middleware
- [ ] Configure Sanctum middleware in `api` route group
- [ ] Create custom middleware for API versioning
- [ ] Create middleware for rate limiting specific endpoints

### Authorization Policies
- [ ] Create AccountPolicy
  - `view()`, `create()`, `update()`, `delete()`
- [ ] Create TransactionPolicy
  - `view()`, `create()`, `update()`, `delete()`
- [ ] Create BudgetPolicy
  - `view()`, `create()`, `update()`, `delete()`
- [ ] Create GoalPolicy
  - `view()`, `create()`, `update()`, `delete()`
- [ ] Register policies in AuthServiceProvider

---

## 3.2 Models & Relationships

### User Model
- [ ] Add strict types declaration
- [ ] Configure fillable/guarded properties
- [ ] Add proper type hints to methods
- [ ] Define relationships:
  ```php
  public function accounts(): HasMany
  public function transactions(): HasMany
  public function budgets(): HasMany
  public function goals(): HasMany
  public function categories(): HasMany
  ```
- [ ] Add password hashing mutator
- [ ] Hide sensitive attributes (password, remember_token)

### Account Model
- [ ] Create `app/Models/Account.php`
- [ ] Add strict types and fillable properties
- [ ] Define relationships:
  ```php
  public function user(): BelongsTo
  public function transactions(): HasMany
  ```
- [ ] Add casts for `balance` (decimal)
- [ ] Create query scopes:
  - `scopeActive()` - Only active accounts
  - `scopeByType()` - Filter by account type

### Category Model
- [ ] Create `app/Models/Category.php`
- [ ] Add strict types and fillable properties
- [ ] Define relationships:
  ```php
  public function user(): BelongsTo
  public function transactions(): HasMany
  public function children(): HasMany (subcategories)
  public function parent(): BelongsTo
  ```
- [ ] Create query scopes:
  - `scopeSystem()` - System categories (user_id is null)
  - `scopeUserCategories()` - User's custom categories
  - `scopeByType()` - Filter by income/expense

### Transaction Model
- [ ] Create `app/Models/Transaction.php`
- [ ] Add strict types and fillable properties
- [ ] Define relationships:
  ```php
  public function user(): BelongsTo
  public function account(): BelongsTo
  public function category(): BelongsTo
  ```
- [ ] Add casts for `amount` (decimal), `tags` (array)
- [ ] Create query scopes:
  - `scopeIncome()` - Only income transactions
  - `scopeExpense()` - Only expense transactions
  - `scopeThisMonth()` - Current month transactions
  - `scopeThisYear()` - Current year transactions
  - `scopeDateRange($start, $end)` - Custom date range
  - `scopeByCategory($categoryId)` - Filter by category
  - `scopeByAccount($accountId)` - Filter by account

### Budget Model
- [ ] Create `app/Models/Budget.php`
- [ ] Add strict types and fillable properties
- [ ] Define relationships:
  ```php
  public function user(): BelongsTo
  public function category(): BelongsTo
  ```
- [ ] Add casts for `amount` (decimal)
- [ ] Create query scopes:
  - `scopeActive()` - Active budgets only
  - `scopeCurrent()` - Current period budgets

### Goal Model
- [ ] Create `app/Models/Goal.php`
- [ ] Add strict types and fillable properties
- [ ] Define relationships:
  ```php
  public function user(): BelongsTo
  ```
- [ ] Add casts for `target_amount`, `current_amount` (decimal)
- [ ] Create accessors:
  - `getProgressPercentageAttribute()` - Calculate progress
  - `getIsCompletedAttribute()` - Check if goal is reached

### Model Observers
- [ ] Create TransactionObserver
  - `created()` - Update account balance
  - `updated()` - Adjust account balance
  - `deleted()` - Revert account balance
- [ ] Create GoalObserver
  - Check and update status when amount changes
- [ ] Register observers in EventServiceProvider

---

## 3.3 API Controllers & Routes

### Define API Routes
- [ ] Create routes in `routes/api.php` under `/api/v1/` prefix
- [ ] Group authenticated routes with `auth:sanctum` middleware
- [ ] Implement API resource routes for RESTful operations

### AuthController (Public Routes)
```php
POST   /api/v1/register
POST   /api/v1/login
POST   /api/v1/forgot-password
POST   /api/v1/reset-password
```

### AuthController (Protected Routes)
```php
POST   /api/v1/logout
GET    /api/v1/me
```

### AccountController
```php
GET    /api/v1/accounts           # index() - List all accounts
POST   /api/v1/accounts           # store() - Create account
GET    /api/v1/accounts/{id}      # show() - View account
PUT    /api/v1/accounts/{id}      # update() - Update account
DELETE /api/v1/accounts/{id}      # destroy() - Delete account
```

### TransactionController
```php
GET    /api/v1/transactions       # index() - List with filters
POST   /api/v1/transactions       # store() - Create transaction
GET    /api/v1/transactions/{id}  # show() - View transaction
PUT    /api/v1/transactions/{id}  # update() - Update transaction
DELETE /api/v1/transactions/{id}  # destroy() - Delete transaction
POST   /api/v1/transactions/import # import() - CSV import
```

### CategoryController
```php
GET    /api/v1/categories         # index() - List categories
POST   /api/v1/categories         # store() - Create category
GET    /api/v1/categories/{id}    # show() - View category
PUT    /api/v1/categories/{id}    # update() - Update category
DELETE /api/v1/categories/{id}    # destroy() - Delete category
```

### BudgetController
```php
GET    /api/v1/budgets            # index() - List budgets
POST   /api/v1/budgets            # store() - Create budget
GET    /api/v1/budgets/{id}       # show() - View budget with utilization
PUT    /api/v1/budgets/{id}       # update() - Update budget
DELETE /api/v1/budgets/{id}       # destroy() - Delete budget
```

### GoalController
```php
GET    /api/v1/goals              # index() - List goals
POST   /api/v1/goals              # store() - Create goal
GET    /api/v1/goals/{id}         # show() - View goal
PUT    /api/v1/goals/{id}         # update() - Update goal
DELETE /api/v1/goals/{id}         # destroy() - Delete goal
POST   /api/v1/goals/{id}/contribute # contribute() - Add to goal
```

### DashboardController
```php
GET    /api/v1/dashboard          # index() - Dashboard data
```

### ReportController
```php
GET    /api/v1/reports/income-expense    # Income vs expense
GET    /api/v1/reports/by-category       # Spending by category
GET    /api/v1/reports/trends            # Trends over time
GET    /api/v1/reports/export            # Export report
```

---

## 3.4 Request Validation

### Create Form Request Classes

- [ ] `StoreTransactionRequest`
  - Validate amount, account_id, category_id, type, date
  - Ensure account belongs to user
  - Ensure category type matches transaction type
  
- [ ] `UpdateTransactionRequest`
  - Same as store, all fields optional
  
- [ ] `StoreAccountRequest`
  - Validate name, type, balance, currency
  
- [ ] `UpdateAccountRequest`
  - Same as store, all fields optional
  
- [ ] `StoreBudgetRequest`
  - Validate amount, period, category_id, dates
  
- [ ] `StoreGoalRequest`
  - Validate name, target_amount, deadline
  
- [ ] `RegisterRequest`
  - Validate name, email (unique), password (confirmed, min:8)
  
- [ ] `LoginRequest`
  - Validate email, password

### Custom Validation Rules
- [ ] Create `BalanceAvailable` rule - Check sufficient funds for expenses
- [ ] Create `CategoryMatchesType` rule - Category type matches transaction type

---

## 3.5 API Resources

### Create Resource Classes

- [ ] `UserResource` - Transform user data
- [ ] `AccountResource` - Include balance, formatted currency
- [ ] `TransactionResource` - Include category, account details
- [ ] `CategoryResource` - Include parent/children if applicable
- [ ] `BudgetResource` - Include utilization percentage
- [ ] `GoalResource` - Include progress percentage

### Create Resource Collections

- [ ] `AccountCollection`
- [ ] `TransactionCollection` - Add pagination meta
- [ ] `CategoryCollection`

---

## 3.6 Services Layer

### TransactionService
- [ ] `createTransaction(array $data): Transaction`
  - Create transaction
  - Update account balance
  - Handle transfers (two transactions)
  
- [ ] `updateTransaction(Transaction $transaction, array $data): Transaction`
  - Update transaction
  - Recalculate account balance
  
- [ ] `deleteTransaction(Transaction $transaction): void`
  - Delete transaction
  - Revert account balance
  
- [ ] `importFromCsv(UploadedFile $file): Collection`
  - Parse CSV
  - Validate data
  - Bulk create transactions

### BudgetService
- [ ] `calculateUtilization(Budget $budget): array`
  - Get total spent in budget period
  - Calculate percentage used
  - Determine if over/under budget
  
- [ ] `checkBudgetAlerts(Budget $budget): ?array`
  - Check if approaching limit (80%)
  - Check if exceeded limit
  - Return alert data if needed

### ReportService
- [ ] `getIncomeExpenseSummary(string $start, string $end): array`
  - Total income
  - Total expenses
  - Net savings
  
- [ ] `getSpendingByCategory(string $start, string $end): Collection`
  - Group by category
  - Calculate totals and percentages
  
- [ ] `getTrends(string $start, string $end, string $interval): Collection`
  - Daily/weekly/monthly trends
  - Income and expense lines

### DashboardService
- [ ] `getDashboardData(): array`
  - Account balances summary
  - Recent transactions (last 10)
  - Budget status
  - Goal progress
  - Quick stats (this month income/expenses)

---

## 3.7 Additional Backend Features

### Caching
- [ ] Cache category list (rarely changes)
- [ ] Cache dashboard data (1 minute TTL)
- [ ] Cache report data with dynamic keys
- [ ] Implement cache invalidation on data changes

### Queue Jobs
- [ ] `GenerateMonthlyReportJob` - Generate monthly reports
- [ ] `SendBudgetAlertJob` - Send budget notifications
- [ ] `ProcessCsvImportJob` - Handle large CSV imports

### Scheduled Tasks
- [ ] Daily budget check (send alerts)
- [ ] Monthly report generation
- [ ] Database cleanup (old logs)

### Rate Limiting
- [ ] Configure rate limiting in RouteServiceProvider
- [ ] Set limits: 60 requests per minute for authenticated users
- [ ] Set stricter limits for auth endpoints (5 per minute)

### Logging & Monitoring
- [ ] Log critical operations (user registration, large transactions)
- [ ] Configure Telescope for development monitoring
- [ ] Set up query monitoring for N+1 detection

---

## 🧪 Testing Tasks

### Unit Tests
- [ ] Test TransactionService methods
- [ ] Test BudgetService calculations
- [ ] Test ReportService data aggregation
- [ ] Test model scopes
- [ ] Test custom validation rules

### Feature Tests
- [ ] Test authentication endpoints
- [ ] Test CRUD operations for all resources
- [ ] Test authorization (users can only access own data)
- [ ] Test transaction balance updates
- [ ] Test budget utilization calculations
- [ ] Test CSV import functionality

---

## 🎯 Phase 3 Completion Criteria

- ✅ All models created with relationships
- ✅ Authentication system working
- ✅ All API endpoints implemented
- ✅ Request validation in place
- ✅ API resources transforming data
- ✅ Service layer handling business logic
- ✅ Tests passing (>80% coverage)
- ✅ API documentation updated

---

[← Previous: Phase 2 Database](04-phase2-database.md) | [Back to Master Plan](../PLAN.md) | [Next: Phase 4 Frontend →](06-phase4-frontend.md)
