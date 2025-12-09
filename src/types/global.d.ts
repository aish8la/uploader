import type { Environment } from "../configs/env.ts";

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Environment {}
  }
}

export interface IUser {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string | null;
}

export type SafeUser = Omit<IUser, "password">;
