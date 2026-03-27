import z from "zod";

export const userField = {
  id: z.int(),
  email: z.email().trim(),
  password: z
    .string()
    .regex(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()-+=^])(?=\S+$).{8,20}$/,
    ),
  firstName: z.string().trim(),
  lastName: z
    .string()
    .trim()
    .optional()
    .transform((v) => (v === "" || v === undefined ? null : v))
    .nullable(),
};

export const uuidInput = z.string().pipe(z.guid());

export const folderName = z.string().max(20).min(1);
