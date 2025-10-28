import { z } from 'zod';
import { EntryType } from '@prisma/client';

const createEntryBodySchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  type: z.enum([EntryType.MOVIE, EntryType.TV_SHOW], {
    message: 'Invalid type. Must be MOVIE or TV_SHOW',
  }),
  year: z.coerce
    .number({ message: 'Year must be a number' })
    .int({ message: 'Year must be a whole number' })
    .positive({ message: 'Year must be a positive number' }),

  // Optional fields
  director: z.string().optional(),
  budget: z.coerce.number().positive().optional(),
  location: z.string().optional(),
  duration: z.coerce.number().int().positive().optional(),
});

const updateEntryBodySchema = createEntryBodySchema.partial();

export const createEntrySchema = z.object({
  body: createEntryBodySchema,
});

export const updateEntrySchema = z.object({
  body: updateEntryBodySchema,
});