# Frontend Build Fix Action Plan

**Date:** February 9, 2026  
**Status:** 115 TypeScript Errors to Resolve  
**Priority:** HIGH

---

## Problem Summary

The newly implemented pages (TransactionsPage, AccountsPage, BudgetsPage, GoalsPage, ReportsPage, SettingsPage) have TypeScript compilation errors due to:

1. Missing npm dependencies
2. Component API mismatches
3. Hook pattern inconsistencies
4. Missing validation schemas
5. Type definition gaps

---

## Action Items (In Order)

### 1. Install Missing Dependencies ⚡ PRIORITY 1

```bash
cd frontend
npm install @heroicons/react
```

**Impact:** Fixes ~20 errors related to icon imports

---

### 2. Create Missing Validation Schemas 📝 PRIORITY 2

Create the following schema files in `frontend/src/schemas/`:

#### `account.ts`
```typescript
import { z } from 'zod';

export const accountSchema = z.object({
  name: z.string().min(1, 'Account name is required'),
  type: z.enum(['checking', 'savings', 'credit', 'cash', 'investment']),
  balance: z.number(),
  currency: z.string().default('USD'),
  is_active: z.boolean().default(true),
});
```

#### `budget.ts`
```typescript
import { z } from 'zod';

export const budgetSchema = z.object({
  category_id: z.number().positive('Category is required'),
  amount: z.number().positive('Amount must be greater than 0'),
  period: z.enum(['daily', 'weekly', 'monthly', 'yearly']),
  start_date: z.string(),
  end_date: z.string().optional(),
  is_active: z.boolean().default(true),
});
```

#### `goal.ts`
```typescript
import { z } from 'zod';

export const goalSchema = z.object({
  name: z.string().min(1, 'Goal name is required'),
  target_amount: z.number().positive('Target amount must be greater than 0'),
  current_amount: z.number().min(0).default(0),
  target_date: z.string().optional(),
  description: z.string().optional(),
});
```

#### `transaction.ts`
```typescript
import { z } from 'zod';

export const transactionSchema = z.object({
  account_id: z.number().positive('Account is required'),
  category_id: z.number().positive('Category is required'),
  type: z.enum(['income', 'expense', 'transfer']),
  amount: z.number().positive('Amount must be greater than 0'),
  description: z.string().optional(),
  transaction_date: z.string(),
  notes: z.string().optional(),
});
```

**Impact:** Fixes ~4 errors

---

### 3. Add Missing Type Definitions 🔧 PRIORITY 3

Update `frontend/src/types/` files:

#### Add to `account.ts`
```typescript
export type CreateAccountRequest = Omit<Account, 'id' | 'user_id' | 'created_at' | 'updated_at'>;
```

#### Add to `budget.ts`
```typescript
export type CreateBudgetRequest = Omit<Budget, 'id' | 'user_id' | 'spent' | 'created_at' | 'updated_at'>;
```

#### Add to `goal.ts`
```typescript
export interface Goal {
  id: number;
  user_id: number;
  name: string;
  target_amount: number;
  current_amount: number;
  target_date?: string | null;  // ADD THIS
  description?: string | null;   // ADD THIS
  created_at: string;
  updated_at: string;
}

export type CreateGoalRequest = Omit<Goal, 'id' | 'user_id' | 'created_at' | 'updated_at'>;
```

#### Add to `transaction.ts`
```typescript
export type CreateTransactionRequest = Omit<Transaction, 'id' | 'user_id' | 'created_at' | 'updated_at' | 'account' | 'category'>;
```

**Impact:** Fixes ~10 errors

---

### 4. Update Component APIs 🎨 PRIORITY 4

#### Option A: Update Components (Recommended)

##### Update `Button.tsx`
```typescript
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;   // ADD THIS
  rightIcon?: React.ReactNode;  // ADD THIS
}

// In the component JSX:
<button ...>
  {isLoading ? (
    <span className="animate-spin">⏳</span>
  ) : (
    <>
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </>
  )}
</button>
```

##### Update `LoadingSpinner.tsx`
```typescript
export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'large';  // ADD 'large'
  centered?: boolean;  // ADD THIS
}

// Add conditional centering wrapper in JSX
```

##### Update `Badge.tsx`
```typescript
// Accept both 'sm'/'small', 'md'/'medium', 'lg'/'large'
size?: 'sm' | 'small' | 'md' | 'medium' | 'lg' | 'large';

// Map in component:
const sizeMap = {
  sm: 'sm', small: 'sm',
  md: 'md', medium: 'md',
  lg: 'lg', large: 'lg',
};
const normalizedSize = sizeMap[size] || 'md';
```

##### Update `Card.tsx`
```typescript
variant?: 'default' | 'bordered' | 'outlined' | 'elevated';  // ADD 'outlined'

// Map outlined to bordered
const variantStyles = {
  default: '...',
  bordered: 'border border-gray-200...',
  outlined: 'border border-gray-200...',  // Same as bordered
  elevated: '...',
};
```

##### Update `Select.tsx`
```typescript
export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options?: Array<{ value: string | number; label: string }>;  // Make optional
  children?: React.ReactNode;  // ADD THIS
}

// In JSX: Use children if provided, otherwise use options
<select ...>
  {children || options?.map(...)}
</select>
```

**Impact:** Fixes ~60 errors

#### Option B: Update Pages to Match Existing APIs

- Remove `leftIcon` / `rightIcon` usage
- Place icons inside Button children
- Change `size="small"` to `size="sm"`
- Change `size="large"` to `size="lg"`
- Change `variant="outlined"` to `variant="bordered"`
- Remove `centered` prop from LoadingSpinner

**Impact:** Fixes ~60 errors but requires more page edits

---

### 5. Fix Hook Usage Patterns 🔗 PRIORITY 5

#### Option A: Refactor Pages (Simpler)

Change from:
```typescript
const createMutation = useCreateAccount();
const updateMutation = useUpdateAccount();
```

To:
```typescript
const {
  createAccount,
  updateAccount,
  deleteAccount,
  toggleAccountActive,
  accounts,
  isLoading,
  error
} = useAccounts();
```

Then use:
```typescript
await createAccount(data);  // Instead of createMutation.mutateAsync(data)
```

#### Option B: Export Individual Hooks

Export separate hooks from each file:
```typescript
// In useAccounts.ts
export const useCreateAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateAccountData) => accountService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['accounts'] });
    },
  });
};
```

**Impact:** Fixes ~30 errors

---

### 6. Fix Filter Type Mismatches 🔍 PRIORITY 6

In pages using filters, ensure filter values match expected types:

```typescript
// Change from:
const [filters, setFilters] = useState({
  account_id: '',  // string
  category_id: '', // string
});

// To:
const [filters, setFilters] = useState<TransactionFilters>({
  account_id: undefined,  // number | undefined
  category_id: undefined, // number | undefined
});

// When setting:
onChange={(e) => handleFilterChange('account_id', e.target.value ? Number(e.target.value) : undefined)}
```

**Impact:** Fixes ~5 errors

---

### 7. Add Missing Hook Methods 📦 PRIORITY 7

Update `useReports.ts`:

```typescript
export const useSpendingTrends = (
  startDate: string,
  endDate: string,
  interval: 'daily' | 'weekly' | 'monthly'
) => {
  return useQuery({
    queryKey: ['spending-trends', startDate, endDate, interval],
    queryFn: () => reportService.getSpendingTrends(startDate, endDate, interval),
  });
};

export const useExportReport = () => {
  return useMutation({
    mutationFn: (params: ExportReportParams) => reportService.exportReport(params),
  });
};
```

**Impact:** Fixes ~3 errors

---

## Recommended Fix Order

1. ✅ **Install @heroicons/react** (1 minute)
2. ✅ **Create schema files** (5 minutes)
3. ✅ **Add type definitions** (5 minutes)
4. ✅ **Update component APIs** (15 minutes) - Choose Option A
5. ✅ **Fix hook usage in pages** (10 minutes) - Choose Option A
6. ✅ **Fix filter types** (5 minutes)
7. ✅ **Add missing hook exports** (5 minutes)

**Total Estimated Time:** 45-60 minutes

---

## Testing After Fixes

```bash
cd frontend
npm run build   # Should compile with 0 errors
npm run dev     # Start dev server
```

---

## Alternative: Quick Band-Aid

If immediate build is not critical, document the issues and proceed with testing backend integration:

1. Mark Phase 4 as "95% complete - TypeScript fixes pending"
2. Create GitHub issue tracking the 115 errors
3. Move to Phase 5 (Security) while fixing incrementally
4. Run frontend in dev mode with `--no-check` flag temporarily

---

**Status:** Action plan created  
**Next Step:** Execute fixes in priority order  
**Success Criteria:** `npm run build` exits with code 0

---

*Last Updated: February 9, 2026*
