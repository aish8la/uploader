import type { Environment } from "../configs/env.ts";

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Environment {}
  }
}
