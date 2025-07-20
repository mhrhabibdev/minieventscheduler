import { z } from 'zod';

// Time format validation (HH:MM)
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const createEventSchema = z.object({
  body: z.object({
    title: z.string()
      .min(1, "Title is required")
      .max(100, "Title cannot exceed 100 characters"),

    date: z.coerce.date()
      .min(new Date(), "Event date cannot be in the past"),
    
    time: z.string()
      .min(1, "Time is required")
      .regex(timeRegex, "Invalid time format (must be HH:MM)"),
    
    notes: z.string()
      .max(500, "Notes cannot exceed 500 characters")
      .optional(),
    
    // Category will be auto-populated by backend (not user input)
    category: z.string().optional() // Will be set by AI categorization
  })
});

export const updateEventSchema = z.object({
  body: z.object({
    archived: z.boolean().optional()
  })
});

export const eventValidation = {
  createEventSchema,
  updateEventSchema
};