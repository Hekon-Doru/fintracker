# Technology Stack

[← Back to Master Plan](../PLAN.md)

---

## 🛠️ Complete Technology Stack

### Frontend Stack

#### Core Framework
- **React 18+** with **TypeScript** (strict mode enabled)
- **Vite** - Build tool and development server (faster than CRA)
- Modern ES6+ features with full type safety

#### Routing & Navigation
- **React Router v6+** - Client-side routing with nested routes and lazy loading

#### State Management
- **TanStack Query (React Query v4+)** - Server state management, caching, and synchronization
- **React Context API** - Global state for auth, theme, and UI preferences

#### Forms & Validation
- **React Hook Form** - Performant form state management
- **Zod** - Runtime validation with TypeScript schema generation

#### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- Custom design system with CSS variables for theming
- Dark mode support

#### Data Visualization
- **Recharts** - React-based charting library for financial visualizations

#### HTTP Client
- **Axios** - HTTP client with interceptors for auth and error handling

#### Utilities
- **date-fns** - Modern date manipulation and formatting library
- Lightweight alternative to Moment.js

---

### Backend Stack

#### Core Framework
- **Laravel 10+** - PHP framework following MVC pattern
- **PHP 8.2+** - Modern PHP with strict types enabled (`declare(strict_types=1)`)

#### Database
- **MySQL** or **PostgreSQL** - Relational database
- **Eloquent ORM** - Laravel's database abstraction layer

#### Caching & Queues
- **Redis** - In-memory data store for:
  - Session storage
  - Application caching
  - Queue backend for async jobs

#### Authentication
- **Laravel Sanctum** - API token authentication for SPA

#### Authorization
- **Spatie Laravel Permission** - Role-based access control (RBAC)

#### Development & Debugging
- **Laravel Telescope** - Debugging and performance monitoring tool
- **Laravel Pint** or **PHP CS Fixer** - Code formatting and PSR-12 compliance

#### Testing
- **PHPUnit** - Unit and feature testing
- **Pest** (optional) - Modern, elegant testing framework for PHP

---

### DevOps & Development Tools

#### Version Control
- **Git** - Version control system
- **GitHub** - Code hosting and collaboration
- Conventional commit messages for changelog generation

#### Code Quality
- **ESLint** - JavaScript/TypeScript linting (frontend)
- **Prettier** - Code formatting (frontend)
- **Laravel Pint** - PHP code formatting (backend)
- **Husky** - Git hooks for pre-commit checks

#### Testing Frameworks
- **Jest** - JavaScript testing framework
- **React Testing Library** - Component testing
- **Playwright** or **Cypress** - End-to-end testing
- **PHPUnit** - PHP unit testing

#### Continuous Integration/Deployment
- **GitHub Actions** - CI/CD pipeline
  - Automated testing on PRs
  - Code quality checks
  - Automated deployments

#### Containerization (Optional)
- **Docker** - Containerization for consistent development environments
- **Docker Compose** - Multi-container orchestration

---

### Hosting & Deployment

#### Frontend Hosting
- **Vercel** - Recommended (optimized for React/Vite)
- **Netlify** - Alternative option
- **AWS S3 + CloudFront** - For custom infrastructure

#### Backend Hosting
- **Laravel Forge** - Managed Laravel hosting
- **DigitalOcean** - VPS with manual setup
- **AWS EC2** - Scalable cloud hosting
- **Heroku** - Quick deployment (hobby projects)

#### Database Hosting
- **AWS RDS** - Managed MySQL/PostgreSQL
- **PlanetScale** - Serverless MySQL
- **DigitalOcean Managed Databases**

#### Caching/Queue
- **Redis Cloud** - Managed Redis service
- **AWS ElastiCache** - Redis on AWS

---

### Monitoring & Analytics

#### Application Monitoring
- **Sentry** - Error tracking and performance monitoring
- **Laravel Telescope** - Backend debugging (development)

#### Analytics
- **Google Analytics** - User behavior tracking
- **Plausible** or **Fathom** - Privacy-focused alternatives

#### Performance Monitoring
- **Lighthouse** - Web performance auditing
- **Web Vitals** - Core Web Vitals tracking

---

### Additional Tools

#### Design & Prototyping
- **Figma** - UI/UX design and prototyping
- **Storybook** (optional) - Component documentation

#### Documentation
- **Swagger/OpenAPI** - API documentation
- **Markdown** - General documentation

#### Communication
- **Slack** or **Discord** - Team communication
- **GitHub Issues** - Bug tracking and feature requests

---

## 📦 Key Packages Summary

### Frontend Dependencies
```json
{
  "dependencies": {
    "react": "^18.x",
    "react-dom": "^18.x",
    "react-router-dom": "^6.x",
    "@tanstack/react-query": "^4.x",
    "react-hook-form": "^7.x",
    "zod": "^3.x",
    "axios": "^1.x",
    "recharts": "^2.x",
    "date-fns": "^2.x"
  },
  "devDependencies": {
    "@types/react": "^18.x",
    "@types/react-dom": "^18.x",
    "typescript": "^5.x",
    "vite": "^4.x",
    "@vitejs/plugin-react": "^4.x",
    "tailwindcss": "^3.x",
    "eslint": "^8.x",
    "prettier": "^3.x",
    "jest": "^29.x",
    "@testing-library/react": "^14.x",
    "playwright": "^1.x"
  }
}
```

### Backend Dependencies
```json
{
  "require": {
    "php": "^8.2",
    "laravel/framework": "^10.0",
    "laravel/sanctum": "^3.0",
    "laravel/telescope": "^4.0",
    "spatie/laravel-permission": "^5.0"
  },
  "require-dev": {
    "laravel/pint": "^1.0",
    "phpunit/phpunit": "^10.0",
    "pestphp/pest": "^2.0"
  }
}
```

---

## 🔧 Development Environment Requirements

### Minimum Requirements
- **Node.js**: v18+ (for frontend)
- **PHP**: 8.2+ (for backend)
- **Composer**: Latest version (PHP dependency manager)
- **MySQL**: 8.0+ or **PostgreSQL**: 13+
- **Redis**: 6.0+ (for caching and queues)

### Recommended IDE
- **Visual Studio Code** with extensions:
  - ESLint
  - Prettier
  - PHP Intelephense
  - Laravel Extension Pack
  - Tailwind CSS IntelliSense
  - GitLens

---

## 🔐 Environment Variables

### Frontend (.env)
```bash
VITE_API_BASE_URL=http://localhost:8000/api
VITE_APP_NAME=FinTracker
```

### Backend (.env)
```bash
APP_NAME=FinTracker
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=fintracker
DB_USERNAME=root
DB_PASSWORD=

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

CACHE_DRIVER=redis
SESSION_DRIVER=redis
QUEUE_CONNECTION=redis
```

---

[← Previous: Project Overview](01-project-overview.md) | [Back to Master Plan](../PLAN.md) | [Next: Phase 1 Setup →](03-phase1-setup.md)
