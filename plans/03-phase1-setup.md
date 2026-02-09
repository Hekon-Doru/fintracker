# Phase 1: Project Setup & Infrastructure

[← Back to Master Plan](../PLAN.md)

---

## 🎯 Phase Objective

Set up both backend and frontend projects with proper tooling, folder structure, and development environment.

**Estimated Duration:** 3-5 days

---

## 1.1 Backend Setup (Laravel)

### Initial Project Setup
- [ ] Initialize Laravel 10+ project (PHP 8.2+)
  ```bash
  composer create-project laravel/laravel fintracker-backend
  cd fintracker-backend
  ```
- [ ] Configure environment variables (.env)
  - Database credentials
  - App name, URL, environment
  - Redis configuration
- [ ] Enable strict types in PHP files
  - Add `declare(strict_types=1);` to all PHP files
  - Configure in service provider template

### Database Configuration
- [ ] Set up database (MySQL/PostgreSQL)
- [ ] Test database connection
- [ ] Run initial migrations to verify setup

### Package Installation
- [ ] Install Laravel Sanctum
  ```bash
  composer require laravel/sanctum
  php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
  ```
- [ ] Install Laravel Telescope
  ```bash
  composer require laravel/telescope
  php artisan telescope:install
  ```
- [ ] Install Spatie Laravel Permission
  ```bash
  composer require spatie/laravel-permission
  php artisan vendor:publish --provider="Spatie\Permission\PermissionServiceProvider"
  ```

### Configuration
- [ ] Configure CORS for API access
  - Update `config/cors.php`
  - Allow frontend origin
- [ ] Set up Redis for caching and queues
  - Install Redis client: `composer require predis/predis`
  - Configure cache driver in `.env`: `CACHE_DRIVER=redis`
- [ ] Configure queue system
  - Set queue driver: `QUEUE_CONNECTION=redis`
  - Configure queue workers

### Folder Structure
- [ ] Create organized folder structure:
  ```
  app/
  ├── Http/
  │   ├── Controllers/
  │   │   └── Api/              # API controllers
  │   ├── Middleware/           # Custom middleware
  │   ├── Requests/             # Form request validation
  │   └── Resources/            # API resources
  ├── Models/                   # Eloquent models
  ├── Services/                 # Business logic layer
  ├── Repositories/             # Data access layer (optional)
  ├── Policies/                 # Authorization policies
  └── Exceptions/               # Custom exceptions
  ```

### Code Quality Tools
- [ ] Set up Laravel Pint
  ```bash
  composer require laravel/pint --dev
  ```
- [ ] Configure PSR-12 coding standards
- [ ] Create pint.json configuration
- [ ] Run initial formatting: `./vendor/bin/pint`

### Testing Setup
- [ ] Verify PHPUnit configuration (phpunit.xml)
- [ ] Optional: Install Pest
  ```bash
  composer require pestphp/pest --dev
  composer require pestphp/pest-plugin-laravel --dev
  php artisan pest:install
  ```
- [ ] Create test database configuration
- [ ] Run example tests to verify setup

---

## 1.2 Frontend Setup (React + TypeScript)

### Initial Project Setup
- [ ] Initialize React app with Vite + TypeScript
  ```bash
  npm create vite@latest fintracker-frontend -- --template react-ts
  cd fintracker-frontend
  npm install
  ```

### TypeScript Configuration
- [ ] Configure TypeScript with strict mode
- [ ] Update `tsconfig.json`:
  ```json
  {
    "compilerOptions": {
      "target": "ES2020",
      "useDefineForClassFields": true,
      "lib": ["ES2020", "DOM", "DOM.Iterable"],
      "module": "ESNext",
      "skipLibCheck": true,
      "strict": true,
      "noUnusedLocals": true,
      "noUnusedParameters": true,
      "noFallthroughCasesInSwitch": true,
      "baseUrl": ".",
      "paths": {
        "@/*": ["./src/*"]
      }
    }
  }
  ```
- [ ] Configure path aliases
- [ ] Update vite.config.ts for path resolution

### Folder Structure
- [ ] Create organized folder structure:
  ```
  src/
  ├── components/
  │   ├── common/               # Shared reusable components
  │   ├── features/             # Feature-specific components
  │   │   ├── auth/
  │   │   ├── transactions/
  │   │   ├── budgets/
  │   │   ├── reports/
  │   │   └── dashboard/
  │   └── layouts/              # Layout components
  ├── hooks/                    # Custom React hooks
  ├── utils/                    # Utility functions
  ├── types/                    # TypeScript type definitions
  ├── services/                 # API service layer
  ├── contexts/                 # React contexts
  ├── constants/                # Constants and enums
  └── styles/                   # Global styles
  ```

### Package Installation

#### Core Dependencies
- [ ] Install React Router
  ```bash
  npm install react-router-dom
  npm install -D @types/react-router-dom
  ```
- [ ] Install Axios
  ```bash
  npm install axios
  ```
- [ ] Install TanStack Query (React Query)
  ```bash
  npm install @tanstack/react-query
  npm install @tanstack/react-query-devtools
  ```
- [ ] Install React Hook Form
  ```bash
  npm install react-hook-form
  ```
- [ ] Install Zod
  ```bash
  npm install zod
  ```
- [ ] Install date-fns
  ```bash
  npm install date-fns
  ```
- [ ] Install Recharts
  ```bash
  npm install recharts
  ```

#### Styling
- [ ] Install Tailwind CSS
  ```bash
  npm install -D tailwindcss postcss autoprefixer
  npx tailwindcss init -p
  ```
- [ ] Configure Tailwind (tailwind.config.js)
- [ ] Add Tailwind directives to index.css

#### Development Tools
- [ ] Install ESLint
  ```bash
  npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
  npm install -D eslint-plugin-react eslint-plugin-react-hooks
  ```
- [ ] Install Prettier
  ```bash
  npm install -D prettier eslint-config-prettier eslint-plugin-prettier
  ```
- [ ] Create .eslintrc.json configuration
- [ ] Create .prettierrc configuration
- [ ] Create .prettierignore

#### Testing
- [ ] Install Jest and React Testing Library
  ```bash
  npm install -D jest @testing-library/react @testing-library/jest-dom
  npm install -D @testing-library/user-event @types/jest
  ```
- [ ] Install Playwright or Cypress for E2E
  ```bash
  npm install -D @playwright/test
  # or
  npm install -D cypress
  ```
- [ ] Configure test setup files
- [ ] Create sample test to verify setup

---

## 1.3 Development Tools

### Git Repository Setup
- [ ] Initialize Git repository (if not already done)
  ```bash
  git init
  ```
- [ ] Create comprehensive .gitignore files
  - Backend: `/vendor`, `/node_modules`, `.env`, `/storage/*.key`
  - Frontend: `/node_modules`, `/dist`, `.env.local`
- [ ] Create initial commit
- [ ] Set up GitHub repository
- [ ] Push initial code

### Code Quality Configuration

#### Frontend
- [ ] Configure ESLint rules
- [ ] Configure Prettier rules
- [ ] Set up format-on-save in VS Code
- [ ] Test linting: `npm run lint`

#### Backend
- [ ] Configure Laravel Pint
- [ ] Set up Pint rules (pint.json)
- [ ] Test formatting: `./vendor/bin/pint`

### Git Hooks with Husky
- [ ] Install Husky
  ```bash
  npm install -D husky lint-staged
  npx husky install
  ```
- [ ] Configure pre-commit hook
  ```bash
  npx husky add .husky/pre-commit "npx lint-staged"
  ```
- [ ] Configure lint-staged in package.json
  ```json
  {
    "lint-staged": {
      "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
      "*.{json,md}": ["prettier --write"]
    }
  }
  ```

### CI/CD Pipeline (GitHub Actions)
- [ ] Create `.github/workflows` directory
- [ ] Create backend CI workflow
  ```yaml
  # .github/workflows/backend-ci.yml
  name: Backend CI
  on: [push, pull_request]
  jobs:
    test:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v3
        - name: Setup PHP
          uses: shivammathur/setup-php@v2
          with:
            php-version: 8.2
        - name: Install Dependencies
          run: composer install
        - name: Run Tests
          run: php artisan test
  ```
- [ ] Create frontend CI workflow
  ```yaml
  # .github/workflows/frontend-ci.yml
  name: Frontend CI
  on: [push, pull_request]
  jobs:
    test:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v3
        - name: Setup Node
          uses: actions/setup-node@v3
          with:
            node-version: 18
        - name: Install Dependencies
          run: npm ci
        - name: Run Linter
          run: npm run lint
        - name: Run Tests
          run: npm test
  ```

### Environment Files
- [ ] Create `.env.example` files
  - Backend: Document all required variables
  - Frontend: Document API URL and other configs
- [ ] Add comments explaining each variable
- [ ] Document setup instructions in README

---

## 📋 Verification Checklist

### Backend
- [ ] Laravel server runs: `php artisan serve`
- [ ] Database connection works
- [ ] Redis connection works
- [ ] Tests pass: `php artisan test`
- [ ] Linting works: `./vendor/bin/pint --test`

### Frontend
- [ ] Development server runs: `npm run dev`
- [ ] TypeScript compiles without errors: `npm run build`
- [ ] Linting passes: `npm run lint`
- [ ] Tests pass: `npm test`

### Integration
- [ ] Frontend can make requests to backend
- [ ] CORS is properly configured
- [ ] Git hooks work on commit

---

## 🎯 Phase 1 Completion Criteria

- ✅ Both projects (backend and frontend) are initialized
- ✅ All dependencies are installed
- ✅ Folder structures are organized
- ✅ Development tools are configured
- ✅ Code quality tools are working
- ✅ Git repository is set up with proper .gitignore
- ✅ CI/CD pipelines are configured
- ✅ Documentation is in place (README files)

---

[← Previous: Technology Stack](02-technology-stack.md) | [Back to Master Plan](../PLAN.md) | [Next: Phase 2 Database →](04-phase2-database.md)
