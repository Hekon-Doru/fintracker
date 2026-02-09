export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
  },
  // Transactions
  TRANSACTIONS: {
    LIST: '/transactions',
    CREATE: '/transactions',
    UPDATE: (id: number) => `/transactions/${id}`,
    DELETE: (id: number) => `/transactions/${id}`,
    GET: (id: number) => `/transactions/${id}`,
  },
  // Budgets
  BUDGETS: {
    LIST: '/budgets',
    CREATE: '/budgets',
    UPDATE: (id: number) => `/budgets/${id}`,
    DELETE: (id: number) => `/budgets/${id}`,
    GET: (id: number) => `/budgets/${id}`,
  },
  // Categories
  CATEGORIES: {
    LIST: '/categories',
    CREATE: '/categories',
    UPDATE: (id: number) => `/categories/${id}`,
    DELETE: (id: number) => `/categories/${id}`,
  },
  // Reports
  REPORTS: {
    SUMMARY: '/reports/summary',
    SPENDING: '/reports/spending',
    INCOME: '/reports/income',
    TRENDS: '/reports/trends',
  },
} as const;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  TRANSACTIONS: '/transactions',
  BUDGETS: '/budgets',
  REPORTS: '/reports',
  SETTINGS: '/settings',
} as const;

export const QUERY_KEYS = {
  AUTH_USER: 'auth-user',
  TRANSACTIONS: 'transactions',
  TRANSACTION: 'transaction',
  BUDGETS: 'budgets',
  BUDGET: 'budget',
  CATEGORIES: 'categories',
  REPORTS: 'reports',
} as const;
