import { z } from 'zod';

export const accountSchema = z.object({
  name: z.string().min(1, 'Account name is required'),
  type: z.enum(['checking', 'savings', 'credit', 'cash', 'investment'], {
    errorMap: () => ({ message: 'Please select a valid account type' }),
  }),
  balance: z.number().min(0, 'Balance must be a positive number'),
  currency: z.string().default('USD'),
  is_active: z.boolean().default(true),
});

export type AccountFormData = z.infer<typeof accountSchema>;
