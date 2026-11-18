import { z } from "zod";

const createSubjectSchema = z.object({
  schoolId: z.coerce.number().int().positive(),

  subjectName: z.string().trim().min(1),

  subjectCode: z.string().trim().min(1),

  subjectType: z.enum(["THEORY", "PRACTICAL"]).optional(),

  subjectCategory: z.enum(["CORE", "OPTIONAL"]).optional(),

  classIds: z.array(
    z.coerce.number().int().positive()
  ).default([]),
});

const updateSubjectSchema = z.object({
  subjectName: z.string().trim().min(1).optional(),

  subjectCode: z.string().trim().min(1).optional(),

  subjectType: z.enum(["THEORY", "PRACTICAL"]).optional(),

  subjectCategory: z.enum(["CORE", "OPTIONAL"]).optional(),

  classIds: z.array(
    z.coerce.number().int().positive()
  ).optional(),
}).refine(
  (data) => Object.keys(data).length > 0,
  {
    message: "At least one field is required",
  }
);

const subjectIdSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export {
  createSubjectSchema,
  updateSubjectSchema,
  subjectIdSchema,
};