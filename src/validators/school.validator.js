import { z } from "zod";

const createSchoolSchema = z.object({
  schoolName: z.string().min(3, "School name is required"),

  schoolCode: z.coerce.number().int().positive(),

  address: z.string().min(5, "Address is required"),

  city: z.string().min(2),

  state: z.string().min(2),

  pinCode: z.string().regex(/^[0-9]{6}$/, "Invalid pin code"),

  contactNumber: z.string().regex(/^[0-9]{10}$/, "Invalid contact number"),

  email: z.string().email("Invalid email address"),

  affiliationBoard: z.string().min(2),
});

const updateSchoolSchema = createSchoolSchema.partial();

const schoolIdSchema = z.object({
  id: z.coerce.number().int().positive("Invalid school ID"),
});

export {
  createSchoolSchema,
  updateSchoolSchema,
  schoolIdSchema,
};