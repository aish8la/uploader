import type { Request } from "express";
import type { Environment } from "../configs/env.ts";
import type { SafeUser } from "../schemas/validation.schema.ts";
import type { ZodFlattenedError } from "zod";

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Environment {}
  }
  namespace Express {
    interface User extends SafeUser {}
    interface Request {
      validatedInput?: ValidatedInput;
    }
  }
}

export interface AuthenticatedRequest extends Request {
  user: Express.User;
}

type ValidatedInput<TBody = unknown, TParam = unknown> = {
  body: TBody;
  params: TParam;
};

declare module "express-session" {
  interface SessionData {
    inputErrors?: ZodFlattenedError;
  }
}
