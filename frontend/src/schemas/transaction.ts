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
