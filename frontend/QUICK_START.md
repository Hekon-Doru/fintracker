# FinTracker Frontend - Quick Start Guide

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Backend API running on `http://localhost:8000`

### Installation

```bash
cd frontend
npm install
```

### Environment Setup

Create `.env` file in the frontend directory:

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview  # Preview production build
```

---

## 📁 Project Structure Guide

### Adding a New Feature

1. **Types** → Define types in `src/types/`
2. **Service** → Create API service in `src/services/`
3. **Hook** → Create custom hook in `src/hooks/`
4. **Schema** → Add validation schema in `src/schemas/`
5. **Component** → Build UI component in `src/components/features/`
6. **Page** → Create page in `src/pages/`

### Example: Adding a New Feature

```typescript
// 1. Define types (src/types/feature.ts)
export interface Feature {
  id: number;
  name: string;
}

// 2. Create service (src/services/featureService.ts)
export const featureService = {
  getAll: async (): Promise<Feature[]> => {
    const response = await apiClient.get<ApiResponse<Feature[]>>('/features');
    return response.data.data;
  },
};

// 3. Create hook (src/hooks/useFeatures.ts)
export const useFeatures = () => {
  const query = useQuery({
    queryKey: ['features'],
    queryFn: () => featureService.getAll(),
  });
  
  return {
    features: query.data,
    isLoading: query.isLoading,
  };
};

// 4. Create schema (src/schemas/featureSchemas.ts)
export const featureSchema = z.object({
  name: z.string().min(1, 'Name is required'),
});

// 5. Use in component
const FeaturesPage = () => {
  const { features, isLoading } = useFeatures();
  
  if (isLoading) return <LoadingSpinner />;
  
  return (
    <div>
      {features?.map(feature => (
        <div key={feature.id}>{feature.name}</div>
      ))}
    </div>
  );
};
```

---

## 🎨 Styling Guide

### Using Tailwind Classes

```tsx
// Light/dark mode support
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">

// Primary colors
<button className="bg-primary-600 hover:bg-primary-700">

// Custom utilities
<div className="scrollbar-thin">
```

### Custom Components

Use the `cn` utility for conditional classes:

```tsx
import { cn } from '../utils';

<button className={cn(
  'base-classes',
  isActive && 'active-classes',
  isDisabled && 'disabled-classes'
)}>
```

---

## 🔐 Authentication

### Using Auth Context

```tsx
import { useAuth } from '../contexts';

const MyComponent = () => {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  const handleLogin = async () => {
    await login({ email: '...', password: '...' });
  };
  
  return <div>Welcome {user?.name}</div>;
};
```

### Protected Routes

Routes under `<ProtectedRoute />` automatically redirect to login if not authenticated.

---

## 🌙 Dark Mode

### Toggle Theme

```tsx
import { useTheme } from '../contexts';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      {theme === 'dark' ? '🌞' : '🌙'}
    </button>
  );
};
```

---

## 📊 Data Fetching with React Query

### Basic Usage

```tsx
import { useTransactions } from '../hooks';

const TransactionsList = () => {
  const { 
    transactions, 
    isLoading, 
    isError, 
    error 
  } = useTransactions();
  
  if (isLoading) return <LoadingSpinner />;
  if (isError) return <div>Error: {error.message}</div>;
  
  return (
    <ul>
      {transactions?.data.map(t => (
        <li key={t.id}>{t.description}</li>
      ))}
    </ul>
  );
};
```

### Mutations

```tsx
const CreateTransaction = () => {
  const { createTransaction, isCreating } = useTransactions();
  
  const handleSubmit = async (data) => {
    try {
      await createTransaction(data);
      // Success!
    } catch (error) {
      // Handle error
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button disabled={isCreating}>
        {isCreating ? 'Creating...' : 'Create'}
      </button>
    </form>
  );
};
```

---

## 📝 Forms with React Hook Form + Zod

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { transactionSchema } from '../schemas';

const TransactionForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(transactionSchema),
  });
  
  const onSubmit = (data) => {
    // data is fully typed and validated
    console.log(data);
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('amount')} type="number" />
      {errors.amount && <span>{errors.amount.message}</span>}
      
      <button type="submit">Submit</button>
    </form>
  );
};
```

---

## 🛠️ Utility Functions

### Formatting

```tsx
import { formatCurrency, formatDate, formatRelativeTime } from '../utils';

formatCurrency(1234.56);           // "$1,234.56"
formatDate('2024-02-09');          // "Feb 09, 2024"
formatRelativeTime('2024-02-09');  // "2 hours ago"
```

### Calculations

```tsx
import { calculateTotal, calculateBudgetPercentage } from '../utils';

calculateTotal(transactions);               // Total amount
calculateBudgetPercentage(spent, budget);   // Percentage used
```

### Error Handling

```tsx
import { getErrorMessage, getValidationErrors } from '../utils';

try {
  await someApiCall();
} catch (error) {
  const message = getErrorMessage(error);
  const validationErrors = getValidationErrors(error);
}
```

---

## 🧪 Testing

### Running Tests

```bash
npm test              # Run tests
npm run test:ui       # Open test UI
npm run test:coverage # Generate coverage report
```

### Writing Tests

```tsx
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const createTestQueryClient = () => new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

it('renders component', () => {
  const queryClient = createTestQueryClient();
  
  render(
    <QueryClientProvider client={queryClient}>
      <MyComponent />
    </QueryClientProvider>
  );
  
  expect(screen.getByText(/hello/i)).toBeInTheDocument();
});
```

---

## 🔍 Development Tools

### React Query Devtools

Automatically enabled in development mode. Press the React Query icon in the bottom-left corner.

### VS Code Extensions (Recommended)

- Tailwind CSS IntelliSense
- ESLint
- Prettier
- TypeScript Hero

---

## 📦 Available Scripts

```bash
npm run dev         # Start development server
npm run build       # Build for production
npm run preview     # Preview production build
npm run lint        # Lint code
npm run format      # Format code with Prettier
npm test            # Run tests
```

---

## 🎯 Best Practices

1. **Type Everything** - Use TypeScript types for all props and state
2. **Use Hooks** - Leverage custom hooks for data fetching
3. **Validate Forms** - Always use Zod schemas with react-hook-form
4. **Handle Errors** - Use try-catch and display user-friendly messages
5. **Loading States** - Always show loading indicators
6. **Dark Mode** - Test components in both light and dark mode
7. **Responsive** - Design mobile-first, test on different screen sizes
8. **Accessibility** - Use semantic HTML, ARIA labels, keyboard navigation

---

## 🐛 Common Issues

### API Connection Error
- Ensure backend is running on port 8000
- Check VITE_API_BASE_URL in .env
- Verify CORS settings in backend

### Authentication Issues
- Check token in localStorage (`auth_token`)
- Verify token is being sent in request headers
- Check backend auth middleware

### Build Errors
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf .vite`

---

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Query Docs](https://tanstack.com/query/latest)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Documentation](https://zod.dev/)

---

**Happy Coding! 🚀**
