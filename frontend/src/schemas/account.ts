import { z } from 'zod';

export const accountSchema = z.object({
  name: z.string().min(1, 'Account name is required'),
  type: z.enum(['checking', 'savings', 'credit', 'cash', 'investment']),
  balance: z.number(),
  currency: z.string().default('USD'),
  is_active: z.boolean().default(true),
});
