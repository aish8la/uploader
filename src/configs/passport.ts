import { Strategy } from "passport-local";
import passport from "passport";
import * as argon2 from "argon2";
import { getSafeUser, getUserByEmail } from "../services/userService.js";
import { SafeUserSchema, type User } from "../schemas/user.schema.js";

export const localStrategy = new Strategy(
  { usernameField: "email" },
  async (email, password, done) => {
    try {
      const user = await getUserByEmail(email);
      const hashedPassword = user
        ? user.password
        : process.env.FALLBACK_HASH_GEN_STRING;
      const isMatch = await argon2.verify(hashedPassword, password);

      if (user && isMatch) {
        const safeUser = await SafeUserSchema.parseAsync(user);
        return done(null, safeUser);
      }
      return done(null, false, { message: "Invalid credentials" });
    } catch (err) {
      return done(err);
    }
  }
);

passport.serializeUser((user, done) => {
  return done(null, user.id);
});

passport.deserializeUser(async (userId: User["id"], done) => {
  try {
    const user = await getSafeUser(userId);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
