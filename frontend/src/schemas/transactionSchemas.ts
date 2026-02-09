import { z } from 'zod';

export const transactionSchema = z.object({
  account_id: z.number().positive('Please select an account'),
  category_id: z.number().positive('Please select a category'),
  type: z.enum(['income', 'expense', 'transfer'], {
    errorMap: () => ({ message: 'Please select a transaction type' }),
  }),
  amount: z.number().positive('Amount must be greater than 0'),
  description: z.string().optional(),
  transaction_date: z.string().min(1, 'Transaction date is required'),
  notes: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export type TransactionFormData = z.infer<typeof transactionSchema>;
