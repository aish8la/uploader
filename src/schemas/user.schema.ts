import * as z from "zod";

export const UserSchema = z.object({
  id: z.int(),
  email: z.email().trim(),
  password: z.string().trim(),
  firstName: z.string().trim(),
  lastName: z
    .string()
    .trim()
    .optional()
    .transform((v) => (v === "" || v === undefined ? null : v))
    .nullable(),
});

export const SafeUserSchema = UserSchema.omit({ password: true });

export type User = z.infer<typeof UserSchema>;
export type SafeUser = z.infer<typeof SafeUserSchema>;
