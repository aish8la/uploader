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
