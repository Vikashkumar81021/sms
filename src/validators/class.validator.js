import { z } from "zod";

const createClassSchema = z.object({
  schoolId: z.coerce.number().int().positive(),

  className: z.string().trim().min(1),

  classCode: z.string().trim().min(1),

  displayOrder: z.coerce.number().int().min(0),

  isActive: z.boolean().optional().default(true),
});

const updateClassSchema = z.object({
  className: z.string().trim().min(1).optional(),

  classCode: z.string().trim().min(1).optional(),

  displayOrder: z.coerce.number().int().min(0).optional(),

  isActive: z.boolean().optional(),
}).refine(
  (data) => Object.keys(data).length > 0,
  {
    message: "At least one field is required",
  }
);

const classIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export {
  createClassSchema,
  updateClassSchema,
  classIdSchema,
};