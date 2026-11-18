import { z } from "zod";

const createSectionSchema = z.object({
  classId: z.coerce.number().int().positive(),

  sectionName: z.string().trim().min(1),

  classTeacher: z.string().trim().optional(),

  roomNumber: z.string().trim().optional(),

  studentCapacity: z.coerce.number().int().positive(),
});

const updateSectionSchema = z.object({
  sectionName: z.string().trim().min(1).optional(),

  classTeacher: z.string().trim().optional().nullable(),

  roomNumber: z.string().trim().optional().nullable(),

  studentCapacity: z.coerce.number().int().positive().optional(),
}).refine(
  (data) => Object.keys(data).length > 0,
  {
    message: "At least one field is required",
  }
);

const sectionIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export {
  createSectionSchema,
  updateSectionSchema,
  sectionIdSchema,
};