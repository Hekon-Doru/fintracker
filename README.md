# FinTracker

**Full-Stack Personal Finance Management Application**

A comprehensive financial tracking and budgeting application built with React, TypeScript, Laravel, and PHP.

![Status](https://img.shields.io/badge/status-in%20development-yellow)
![Laravel](https://img.shields.io/badge/Laravel-12.x-red)
![React](https://img.shields.io/badge/React-18.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)

## 📋 Overview

FinTracker is a modern web application designed to help users manage their personal finances effectively. Track expenses, create budgets, analyze spending patterns, and gain insights into your financial health.

### Key Features

- 💰 **Transaction Management** - Track income and expenses with categories
- 📊 **Budget Planning** - Set and monitor budgets by category
- 📈 **Financial Reports** - Visualize spending trends and patterns
- 🔒 **Secure Authentication** - User authentication with Laravel Sanctum
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- 🎨 **Modern UI** - Clean interface built with Tailwind CSS

## 🏗️ Architecture

### Tech Stack

**Frontend:**
- React 18 with TypeScript
- Vite (build tool)
- TanStack Query (data fetching)
- React Router (routing)
- Tailwind CSS (styling)
- React Hook Form + Zod (forms & validation)
- Recharts (data visualization)

**Backend:**
- Laravel 12 (PHP 8.2+)
- Laravel Sanctum (API authentication)
- Laravel Telescope (debugging)
- Spatie Laravel Permission (authorization)
- MySQL/PostgreSQL (production)
- SQLite (development)

## 🚀 Getting Started

### Prerequisites

- **Backend:**
  - PHP 8.2 or higher
  - Composer
  - MySQL/PostgreSQL (or SQLite for development)
  
- **Frontend:**
  - Node.js 18+ 
  - npm or yarn

### Quick Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Hekon-Doru/fintracker.git
   cd fintracker
   ```

2. **Backend Setup**
   ```bash
   cd backend
   composer install
   cp .env.example .env
   php artisan key:generate
   php artisan migrate
   php artisan serve
   ```

3. **Frontend Setup** (in a new terminal)
   ```bash
   cd frontend
   npm install
   cp .env.example .env
   npm run dev
   ```

4. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/api/documentation

### Detailed Setup Instructions

See the individual README files:
- [Backend Setup Guide](backend/README.md)
- [Frontend Setup Guide](frontend/README.md)

## 📁 Project Structure

```
fintracker/
├── backend/                 # Laravel API
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/Api/
│   │   │   ├── Middleware/
│   │   │   ├── Requests/
│   │   │   └── Resources/
│   │   ├── Models/
│   │   ├── Services/
│   │   ├── Repositories/
│   │   └── Policies/
│   ├── config/
│   ├── database/
│   ├── routes/
│   └── tests/
│
├── frontend/                # React Application
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── features/
│   │   │   └── layouts/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── types/
│   │   ├── utils/
│   │   └── constants/
│   └── public/
│
├── plans/                   # Project planning documents
├── agents/                  # Development agent guidelines
└── .github/workflows/       # CI/CD pipelines
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
php artisan test
```

### Frontend Tests
```bash
cd frontend
npm test
```

### Run All Tests
```bash
# Backend
cd backend && php artisan test

# Frontend
cd frontend && npm test
```

## 📝 Development

### Code Quality

**Backend (Laravel Pint):**
```bash
cd backend
./vendor/bin/pint          # Fix code style
./vendor/bin/pint --test   # Check code style
```

**Frontend (ESLint + Prettier):**
```bash
cd frontend
npm run lint      # Run ESLint
npm run format    # Format with Prettier
```

### Development Workflow

1. Create a feature branch
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes following the coding standards
   - See [AGENTS.md](AGENTS.md) for general guidelines
   - See [agents/backend-agent.md](agents/backend-agent.md) for backend standards
   - See [agents/frontend-agent.md](agents/frontend-agent.md) for frontend standards

3. Run tests and linters
   ```bash
   # Backend
   cd backend && php artisan test && ./vendor/bin/pint --test
   
   # Frontend
   cd frontend && npm test && npm run lint
   ```

4. Commit your changes
   ```bash
   git commit -m "feat: add new feature"
   ```

5. Push and create a pull request

### Commit Message Format

Follow conventional commits:
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `refactor:` Code refactoring
- `test:` Test additions/changes
- `chore:` Maintenance tasks

## 🗺️ Development Roadmap

See [PLAN.md](PLAN.md) for the complete project plan and progress tracking.

### Current Phase: Phase 1 - Project Setup ✅

- [x] Backend setup with Laravel
- [x] Frontend setup with React + TypeScript
- [x] Development tools configuration
- [x] CI/CD pipelines
- [ ] Next: Database design and migrations

### Upcoming Phases

1. **Phase 2:** Database Design
2. **Phase 3:** Backend Development (API)
3. **Phase 4:** Frontend Development (UI)
4. **Phase 5:** Security & Performance
5. **Phase 6:** Testing
6. **Phase 7:** Deployment
7. **Phase 8:** Additional Features

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

1. Fork the repository
2. Create a feature branch
3. Follow our coding standards (see [AGENTS.md](AGENTS.md))
4. Write tests for new features
5. Submit a pull request

### Development Standards

- Follow PSR-12 for PHP code
- Follow React/TypeScript best practices
- Write descriptive commit messages
- Add tests for new features
- Update documentation as needed

## 📄 License

This project is proprietary software. All rights reserved.

## 👥 Team

- **Development Team:** Full-stack developers
- **Design Team:** UI/UX specialists
- **Project Management:** Agile methodology

## 📞 Support

For questions or issues:
- Create an issue in GitHub
- Contact the development team
- Check the [documentation](plans/)

---

**Built with ❤️ using Laravel and React**
