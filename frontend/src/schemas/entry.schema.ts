import { z } from 'zod';

export const entryFormSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  type: z.enum(['MOVIE', 'TV_SHOW'], {
    message: 'A valid type (MOVIE or TV_SHOW) is required',
  }),
  year: z.coerce
    .number({ message: 'Year is required and must be a number' })
    .int({ message: 'Year must be a whole number' })
    .positive({ message: 'Year must be a positive number' })
    .min(1800, { message: 'Year must be after 1800' }),
  director: z.string().optional(),
  budget: z.coerce.number().positive().optional(),
  location: z.string().optional(),
  duration: z.coerce.number().int().positive().optional(),
});

export type EntryFormValues = z.infer<typeof entryFormSchema>;