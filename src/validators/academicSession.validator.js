import { z } from "zod";

const createAcademicSessionSchema = z.object({
  schoolId: z.coerce.number().int().positive(),

  sessionName: z.string().trim().min(4),

  startDate: z.coerce.date(),

  endDate: z.coerce.date(),

  isActive: z.boolean().optional().default(false),
}).refine(
  (data) => data.endDate > data.startDate,
  {
    message: "End date must be greater than start date",
    path: ["endDate"],
  }
);

const updateAcademicSessionSchema = z.object({
  sessionName: z.string().trim().min(4).optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  isActive: z.boolean().optional(),
}).refine(
  (data) => Object.keys(data).length > 0,
  {
    message: "At least one field is required",
  }
);

const academicSessionIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export {
  createAcademicSessionSchema,
  updateAcademicSessionSchema,
  academicSessionIdSchema,
};