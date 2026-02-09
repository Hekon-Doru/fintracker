import { z } from 'zod';

export const budgetSchema = z.object({
  category_id: z.number().positive('Please select a category').optional(),
  amount: z.number().positive('Amount must be greater than 0'),
  period: z.enum(['daily', 'weekly', 'monthly', 'yearly'], {
    errorMap: () => ({ message: 'Please select a period' }),
  }),
  start_date: z.string().min(1, 'Start date is required'),
  end_date: z.string().optional(),
  is_active: z.boolean().default(true),
});

export type BudgetFormData = z.infer<typeof budgetSchema>;
