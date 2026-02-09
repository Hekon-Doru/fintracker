# FinTracker Frontend

React + TypeScript application for the FinTracker personal finance management system.

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **TanStack Query** - Data fetching and caching
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **Recharts** - Data visualization
- **date-fns** - Date utilities

## Prerequisites

- Node.js 18+
- npm or yarn

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Copy the example environment file:

```bash
cp .env.example .env
```

Update the variables in `.env`:

```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_APP_NAME=FinTracker
```

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Available Scripts

### Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Code Quality

```bash
# Run ESLint
npm run lint

# Format code with Prettier
npm run format
```

### Testing

```bash
# Run tests
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## Project Structure

```text
src/
├── components/
│   ├── common/               # Reusable UI components
│   ├── features/             # Feature-specific components
│   │   ├── auth/            # Authentication components
│   │   ├── transactions/    # Transaction management
│   │   ├── budgets/         # Budget management
│   │   ├── reports/         # Reports and analytics
│   │   └── dashboard/       # Dashboard components
│   └── layouts/             # Layout components
├── pages/                   # Page components
├── hooks/                   # Custom React hooks
├── services/                # API service layer
├── utils/                   # Utility functions
├── types/                   # TypeScript type definitions
├── contexts/                # React contexts
├── constants/               # Constants and configuration
└── styles/                  # Global styles
```

## Coding Standards

### Component Structure

```tsx
import { useState } from 'react';

interface MyComponentProps {
  title: string;
  count?: number;
}

function MyComponent({ title, count = 0 }: MyComponentProps) {
  const [value, setValue] = useState(count);

  return (
    <div>
      <h1>{title}</h1>
      <p>Count: {value}</p>
    </div>
  );
}

export default MyComponent;
```

### Naming Conventions

- **Components**: PascalCase (`UserProfile.tsx`)
- **Hooks**: camelCase with `use` prefix (`useAuth.ts`)
- **Utilities**: camelCase (`formatCurrency.ts`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Types/Interfaces**: PascalCase (`User`, `ApiResponse`)

### File Organization

- One component per file
- Group related components in feature folders
- Co-locate tests with components
- Use index files for cleaner imports

### State Management

- Use React hooks for local state
- Use TanStack Query for server state
- Use Context API for global app state
- Keep state as close to where it's needed as possible

## API Integration

### Using the API Client

```tsx
import { apiClient } from '@/services/apiClient';
import { API_ENDPOINTS } from '@/constants/api';

// GET request
const response = await apiClient.get(API_ENDPOINTS.TRANSACTIONS.LIST);

// POST request
const newTransaction = await apiClient.post(
  API_ENDPOINTS.TRANSACTIONS.CREATE,
  { amount: 100, description: 'Groceries' }
);
```

### Using TanStack Query

```tsx
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiClient } from '@/services/apiClient';
import { QUERY_KEYS } from '@/constants/api';

function TransactionList() {
  const { data, isLoading, error } = useQuery({
    queryKey: [QUERY_KEYS.TRANSACTIONS],
    queryFn: () => apiClient.get('/transactions'),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading transactions</div>;

  return <div>{/* Render transactions */}</div>;
}
```

## Form Handling

### Using React Hook Form with Zod

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  amount: z.number().positive(),
  description: z.string().min(1),
});

type FormData = z.infer<typeof schema>;

function TransactionForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('amount', { valueAsNumber: true })} />
      {errors.amount && <span>{errors.amount.message}</span>}
      
      <input {...register('description')} />
      {errors.description && <span>{errors.description.message}</span>}
      
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Styling with Tailwind CSS

### Custom Configuration

The Tailwind configuration includes custom colors and theme extensions. See [tailwind.config.js](tailwind.config.js).

### Usage

```tsx
function Button({ children }: { children: React.ReactNode }) {
  return (
    <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded">
      {children}
    </button>
  );
}
```

## Environment Variables

| Variable            | Description          | Default                     |
|---------------------|----------------------|-----------------------------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:8000/api` |
| `VITE_APP_NAME`     | Application name     | `FinTracker`                |

## Building for Production

```bash
# Create optimized production build
npm run build

# Preview the production build
npm run preview
```

The build output will be in the `dist` directory.

## Deployment

The application can be deployed to:

- **Vercel** (recommended)
- **Netlify**
- **AWS S3 + CloudFront**
- **Azure Static Web Apps**
- Any static hosting service

### Environment Variables for Production

Ensure the following environment variables are set in your deployment platform:

- `VITE_API_BASE_URL`: Your production API URL

## Contributing

Please follow the coding standards defined in:

- [AGENTS.md](../AGENTS.md)
- [agents/frontend-agent.md](../agents/frontend-agent.md)

## License

This project is proprietary software.
