import * as z from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().min(1000),
  DATABASE_URL: z.url(),
  NODE_ENV: z
    .union([z.literal("development"), z.literal("production")])
    .default("development"),
  FALLBACK_HASH_GEN_STRING: z.string(),
  SESSION_SECRET: z.string(),
});

envSchema.parse(process.env);

export type Environment = z.infer<typeof envSchema>;
