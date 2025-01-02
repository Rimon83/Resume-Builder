import { z } from "zod";

export const optionalString = z.string().trim().optional().or(z.literal(""));
export const generalInfoSchema = z.object({
  title: optionalString,
  description: optionalString,
});

export type GeneralInfoValues = z.infer<typeof generalInfoSchema>;

// personal info
export const personalInfoSchema = z.object({
  photo: z
    .custom<File | undefined>()
    .refine(
      (file) =>
        !file || (file instanceof File && file.type.startsWith("image/")),
      "Must be an image file",
    )
    .refine(
      (file) => !file || file.size <= 1024 * 1024 * 4,
      "Must be less than 4MB",
    ),
  firstName: optionalString,
  lastName: optionalString,
  email: optionalString,
  phone: optionalString,
  city: optionalString,
  country: optionalString,
  jobTitle: optionalString,
});
export type PersonalInfoValues = z.infer<typeof personalInfoSchema>;

// work experience schema
export const workExperienceSchema = z.object({
  workExperiences: z
    .array(
      z.object({
        company: optionalString,
        position: optionalString,
        startDate: optionalString,
        endDate: optionalString,
        duties: optionalString,
      }),
    )
    .optional(),
});
export type WorkExperienceValues = z.infer<typeof workExperienceSchema>;
export type WorkExperience = NonNullable<
  z.infer<typeof workExperienceSchema>["workExperiences"]
>[number];

// education
export const educationSchema = z.object({
  education: z
    .array(
      z.object({
        school: optionalString,
        degree: optionalString,
        fieldOfStudy: optionalString,
        startDate: optionalString,
        endDate: optionalString,
      }),
    )
    .optional(),
});
export type EducationValues = z.infer<typeof educationSchema>;

// skills
export const skillSchema = z.object({
  skills: z.array(z.string()).optional(),
});
export type SkillValues = z.infer<typeof skillSchema>;

//summary
export const summarySchema = z.object({
  summary: optionalString,
});
export type SummaryValues = z.infer<typeof summarySchema>;

// make resume schema for all data of forms
export const resumeSchema = z.object({
  ...generalInfoSchema.shape,
  ...personalInfoSchema.shape,
  ...workExperienceSchema.shape,
  ...educationSchema.shape,
  ...skillSchema.shape,
  ...summarySchema.shape,
  colorHex: optionalString,
  borderStyle: optionalString,
});
export type ResumeValues = Omit<z.infer<typeof resumeSchema>, "photo"> & {
  id?: string;
  photo?: File | string | null;
};

export const generateSummarySchema = z.object({
  jobTitle: optionalString,
  ...workExperienceSchema.shape,
  ...educationSchema.shape,
  ...skillSchema.shape,
});

export type GenerateSummaryInput = z.infer<typeof generateSummarySchema>;

export const generateWorkExperienceSchema = z.object({
  description: z
    .string()
    .trim()
    .min(1, "Required")
    .min(20, "Must be at least 20 characters"),
});

export type GenerateWorkExperienceInput = z.infer<
  typeof generateWorkExperienceSchema
>;