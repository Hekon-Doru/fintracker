import { z } from 'zod';

export const goalSchema = z.object({
  name: z.string().min(1, 'Goal name is required'),
  target_amount: z.number().positive('Target amount must be greater than 0'),
  current_amount: z.number().min(0, 'Current amount must be non-negative').default(0),
  deadline: z.string().optional(),
  status: z.enum(['active', 'completed', 'cancelled']).default('active'),
});

export const contributeSchema = z.object({
  amount: z.number().positive('Amount must be greater than 0'),
});

export type GoalFormData = z.infer<typeof goalSchema>;
export type ContributeFormData = z.infer<typeof contributeSchema>;
