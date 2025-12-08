import session from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { prisma } from "./prisma.js";
import type { RequestHandler } from "express";

const isProduction = process.env.NODE_ENV === "production";

export const sessionMiddleware: RequestHandler = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: isProduction,
    secure: isProduction,
    maxAge: 1000 * 60 * 60,
  },
  store: new PrismaSessionStore(prisma, {
    checkPeriod: 2 * 60 * 1000,
    dbRecordIdIsSessionId: true,
  }),
});
