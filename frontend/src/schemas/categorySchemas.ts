import { z } from 'zod';

export const categorySchema = z.object({
  name: z.string().min(1, 'Category name is required'),
  type: z.enum(['income', 'expense'], {
    errorMap: () => ({ message: 'Please select a category type' }),
  }),
  icon: z.string().optional(),
  color: z.string().optional(),
  parent_id: z.number().optional(),
});

export type CategoryFormData = z.infer<typeof categorySchema>;
