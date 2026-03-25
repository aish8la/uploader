import express from "express";
import type { NewUserOutput } from "../schemas/validation.schema.js";
import type { ValidatedInput } from "../types/global.js";
import { postNewUser } from "../services/userService.js";
import * as argon2 from "argon2";
import passport from "passport";

export const getLogin: express.RequestHandler = (req, res) => {
  res.render("auth/login");
};

export const getSignup: express.RequestHandler = (req, res) => {
  res.render("auth/signup");
};

export const postSignup: express.RequestHandler = async (req, res) => {
  //TODO: Use validated data

  const { body } = req.validatedInput as ValidatedInput<NewUserOutput, unknown>;

  await postNewUser({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    password: await argon2.hash(body.password),
  });
  res.redirect("/");
};

export const postLogin: express.RequestHandler = (req, res, next) => {
  const authCallback: passport.AuthenticateCallback = (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.render("auth/login", { errors: info });
    }

    req.logIn(user, (err) => {
      if (err) return next(err);
      req.session.save((err) => {
        if (err) return next(err);
        const returnUrl = req.query.returnTo;
        return res.redirect((returnUrl as string) || "/");
      });
    });
  };
  passport.authenticate("local", authCallback)(req, res, next);
};

export const getLogout: express.RequestHandler = (req, res, next) => {
  req.logOut((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
};
