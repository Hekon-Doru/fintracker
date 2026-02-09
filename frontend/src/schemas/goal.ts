import { z } from 'zod';

export const goalSchema = z.object({
  name: z.string().min(1, 'Goal name is required'),
  target_amount: z.number().positive('Target amount must be greater than 0'),
  current_amount: z.number().min(0).default(0),
  target_date: z.string().optional(),
  description: z.string().optional(),
});
