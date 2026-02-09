# Phase 2: Database Design

[← Back to Master Plan](../PLAN.md)

---

## 🎯 Phase Objective

Design and implement the complete database schema for the FinTracker application.

**Estimated Duration:** 2-3 days

---

## 2.1 Core Tables

### Users Table

**Purpose:** Store user authentication and profile information

```php
Schema::create('users', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->string('email')->unique();
    $table->timestamp('email_verified_at')->nullable();
    $table->string('password');
    $table->rememberToken();
    $table->timestamps();
});
```

**Fields:**
- `id` - Primary key (bigint, auto-increment)
- `name` - User's full name (string)
- `email` - Unique email address (string, indexed)
- `email_verified_at` - Email verification timestamp (nullable)
- `password` - Hashed password (string)
- `remember_token` - For "remember me" functionality
- `created_at`, `updated_at` - Automatic timestamps

---

### Accounts Table

**Purpose:** Manage user's financial accounts (bank accounts, wallets, credit cards)

```php
Schema::create('accounts', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->string('name');
    $table->enum('type', ['checking', 'savings', 'credit', 'cash', 'investment']);
    $table->decimal('balance', 15, 2)->default(0);
    $table->string('currency', 3)->default('USD');
    $table->boolean('is_active')->default(true);
    $table->timestamps();
    
    $table->index('user_id');
    $table->index(['user_id', 'is_active']);
});
```

**Fields:**
- `id` - Primary key
- `user_id` - Foreign key to users table
- `name` - Account name (e.g., "Main Checking", "Savings")
- `type` - Account type (enum)
- `balance` - Current balance (decimal 15,2)
- `currency` - Currency code (ISO 4217, default: USD)
- `is_active` - Whether account is active (boolean)
- `created_at`, `updated_at` - Timestamps

**Indexes:**
- Foreign key on `user_id`
- Composite index on `user_id` and `is_active`

---

### Categories Table

**Purpose:** Organize transactions into categories and subcategories

```php
Schema::create('categories', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade');
    $table->string('name');
    $table->enum('type', ['income', 'expense']);
    $table->string('icon')->nullable();
    $table->string('color', 7)->nullable(); // hex color code
    $table->foreignId('parent_id')->nullable()->constrained('categories')->onDelete('cascade');
    $table->timestamps();
    
    $table->index('user_id');
    $table->index('type');
    $table->index('parent_id');
});
```

**Fields:**
- `id` - Primary key
- `user_id` - Foreign key to users (nullable for system categories)
- `name` - Category name (e.g., "Groceries", "Salary")
- `type` - Income or Expense
- `icon` - Icon identifier (nullable)
- `color` - Hex color code for UI (nullable)
- `parent_id` - Self-referencing foreign key for subcategories
- `created_at`, `updated_at` - Timestamps

**Indexes:**
- Foreign key on `user_id`
- Index on `type`
- Index on `parent_id`

**Notes:**
- System categories have `user_id = null`
- User-created categories have a `user_id`
- Subcategories reference parent via `parent_id`

---

### Transactions Table

**Purpose:** Record all financial transactions

```php
Schema::create('transactions', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->foreignId('account_id')->constrained()->onDelete('cascade');
    $table->foreignId('category_id')->constrained()->onDelete('restrict');
    $table->enum('type', ['income', 'expense', 'transfer']);
    $table->decimal('amount', 15, 2);
    $table->string('description')->nullable();
    $table->date('transaction_date');
    $table->text('notes')->nullable();
    $table->json('tags')->nullable();
    $table->timestamps();
    
    $table->index('user_id');
    $table->index('account_id');
    $table->index('category_id');
    $table->index('transaction_date');
    $table->index(['user_id', 'transaction_date']);
});
```

**Fields:**
- `id` - Primary key
- `user_id` - Foreign key to users
- `account_id` - Foreign key to accounts
- `category_id` - Foreign key to categories
- `type` - Transaction type (income, expense, transfer)
- `amount` - Transaction amount (decimal 15,2)
- `description` - Short description (nullable)
- `transaction_date` - Date of transaction
- `notes` - Additional notes (text, nullable)
- `tags` - JSON array of tags (nullable)
- `created_at`, `updated_at` - Timestamps

**Indexes:**
- Foreign keys on `user_id`, `account_id`, `category_id`
- Index on `transaction_date` for date range queries
- Composite index on `user_id` and `transaction_date`

---

### Budgets Table

**Purpose:** Track spending budgets for categories

```php
Schema::create('budgets', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->foreignId('category_id')->nullable()->constrained()->onDelete('cascade');
    $table->decimal('amount', 15, 2);
    $table->enum('period', ['daily', 'weekly', 'monthly', 'yearly']);
    $table->date('start_date');
    $table->date('end_date')->nullable();
    $table->boolean('is_active')->default(true);
    $table->timestamps();
    
    $table->index('user_id');
    $table->index('category_id');
    $table->index(['user_id', 'is_active']);
});
```

**Fields:**
- `id` - Primary key
- `user_id` - Foreign key to users
- `category_id` - Foreign key to categories (nullable for overall budget)
- `amount` - Budget amount (decimal 15,2)
- `period` - Budget period (daily, weekly, monthly, yearly)
- `start_date` - Budget start date
- `end_date` - Budget end date (nullable for ongoing budgets)
- `is_active` - Whether budget is active
- `created_at`, `updated_at` - Timestamps

**Indexes:**
- Foreign keys on `user_id`, `category_id`
- Composite index on `user_id` and `is_active`

---

### Goals Table

**Purpose:** Track financial goals and savings targets

```php
Schema::create('goals', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->string('name');
    $table->decimal('target_amount', 15, 2);
    $table->decimal('current_amount', 15, 2)->default(0);
    $table->date('deadline')->nullable();
    $table->enum('status', ['active', 'completed', 'cancelled'])->default('active');
    $table->timestamps();
    
    $table->index('user_id');
    $table->index(['user_id', 'status']);
});
```

**Fields:**
- `id` - Primary key
- `user_id` - Foreign key to users
- `name` - Goal name (e.g., "Emergency Fund", "Vacation")
- `target_amount` - Target amount to save (decimal 15,2)
- `current_amount` - Current progress (decimal 15,2)
- `deadline` - Target completion date (nullable)
- `status` - Goal status (active, completed, cancelled)
- `created_at`, `updated_at` - Timestamps

**Indexes:**
- Foreign key on `user_id`
- Composite index on `user_id` and `status`

---

## 2.2 Relationships Overview

### User Relationships
- User **has many** Accounts
- User **has many** Transactions
- User **has many** Budgets
- User **has many** Goals
- User **has many** Categories (custom)

### Account Relationships
- Account **belongs to** User
- Account **has many** Transactions

### Category Relationships
- Category **belongs to** User (nullable - system categories)
- Category **has many** Transactions
- Category **has many** Children (subcategories)
- Category **belongs to** Parent (self-referencing)

### Transaction Relationships
- Transaction **belongs to** User
- Transaction **belongs to** Account
- Transaction **belongs to** Category

### Budget Relationships
- Budget **belongs to** User
- Budget **belongs to** Category (nullable)

### Goal Relationships
- Goal **belongs to** User

---

## 2.3 Database Seeders

### Default Categories Seeder

Create system-wide default categories:

```php
// database/seeders/CategorySeeder.php

// Income Categories
['name' => 'Salary', 'type' => 'income', 'icon' => 'briefcase', 'color' => '#10b981']
['name' => 'Freelance', 'type' => 'income', 'icon' => 'code', 'color' => '#3b82f6']
['name' => 'Investment', 'type' => 'income', 'icon' => 'trending-up', 'color' => '#8b5cf6']
['name' => 'Other Income', 'type' => 'income', 'icon' => 'dollar-sign', 'color' => '#06b6d4']

// Expense Categories
['name' => 'Groceries', 'type' => 'expense', 'icon' => 'shopping-cart', 'color' => '#ef4444']
['name' => 'Dining Out', 'type' => 'expense', 'icon' => 'utensils', 'color' => '#f59e0b']
['name' => 'Transportation', 'type' => 'expense', 'icon' => 'car', 'color' => '#6366f1']
['name' => 'Utilities', 'type' => 'expense', 'icon' => 'zap', 'color' => '#eab308']
['name' => 'Entertainment', 'type' => 'expense', 'icon' => 'film', 'color' => '#ec4899']
['name' => 'Healthcare', 'type' => 'expense', 'icon' => 'heart', 'color' => '#14b8a6']
['name' => 'Shopping', 'type' => 'expense', 'icon' => 'shopping-bag', 'color' => '#a855f7']
['name' => 'Other Expenses', 'type' => 'expense', 'icon' => 'more-horizontal', 'color' => '#64748b']
```

---

## 📋 Migration Tasks

### Create Migrations
- [ ] Create users table migration (already exists)
- [ ] Create accounts table migration
- [ ] Create categories table migration
- [ ] Create transactions table migration
- [ ] Create budgets table migration
- [ ] Create goals table migration

### Add Indexes
- [ ] Add foreign key indexes
- [ ] Add indexes for frequently queried fields
- [ ] Add composite indexes for common query patterns

### Database Constraints
- [ ] Add ON DELETE CASCADE where appropriate
- [ ] Add ON DELETE RESTRICT for critical relationships
- [ ] Ensure unique constraints are in place
- [ ] Add check constraints if supported

### Seeders
- [ ] Create CategorySeeder for default categories
- [ ] Create DatabaseSeeder to run all seeders
- [ ] Optional: Create test data seeder for development

---

## 🧪 Testing Tasks

- [ ] Test all migrations run successfully
- [ ] Test rollback functionality
- [ ] Test foreign key constraints
- [ ] Verify indexes are created
- [ ] Test seeders populate data correctly
- [ ] Verify data types and defaults

---

## 🎯 Phase 2 Completion Criteria

- ✅ All migration files are created
- ✅ Database schema is properly designed
- ✅ Foreign keys and indexes are configured
- ✅ Seeders are implemented
- ✅ Migrations run without errors
- ✅ Database constraints are working
- ✅ Schema documentation is complete

---

[← Previous: Phase 1 Setup](03-phase1-setup.md) | [Back to Master Plan](../PLAN.md) | [Next: Phase 3 Backend →](05-phase3-backend.md)
