import * as z from "zod";
import { userField } from "./base.schema.js";

export const UserSchema = z.object({
  id: userField.id,
  email: userField.email,
  password: userField.password,
  firstName: userField.firstName,
  lastName: userField.lastName,
});

export const SafeUserSchema = UserSchema.omit({ password: true });
export const NewUserSchema = UserSchema.omit({ id: true })
  .extend({
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
  })
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  .transform(({ confirmPassword, ...rest }) => rest);

export type User = z.infer<typeof UserSchema>;
export type SafeUser = z.infer<typeof SafeUserSchema>;
export type NewUserInput = z.input<typeof NewUserSchema>;
export type NewUserOutput = z.output<typeof NewUserSchema>;
