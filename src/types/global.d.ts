import type { Request } from "express";
import type { Environment } from "../configs/env.ts";
import type { SafeUser } from "../schemas/user.schema.ts";

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Environment {}
  }
  namespace Express {
    interface User extends SafeUser {}
  }
}

export interface AuthenticatedRequest extends Request {
  user: Express.User;
}
