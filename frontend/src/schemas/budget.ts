import { z } from 'zod';

export const budgetSchema = z.object({
  category_id: z.number().positive('Category is required'),
  amount: z.number().positive('Amount must be greater than 0'),
  period: z.enum(['daily', 'weekly', 'monthly', 'yearly']),
  start_date: z.string(),
  end_date: z.string().optional(),
  is_active: z.boolean().default(true),
});
