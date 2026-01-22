import express from "express";
import type { NewUser } from "../schemas/user.schema.js";
import { postNewUser } from "../services/userService.js";
import * as argon2 from "argon2";

export const getLogin: express.RequestHandler = (req, res) => {
  res.render("auth/login");
};

export const getSignup: express.RequestHandler = (req, res) => {
  res.render("auth/signup");
};

export const postSignup: express.RequestHandler = async (req, res) => {
  //TODO: Use validated data
  const data: NewUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: await argon2.hash(req.body.password),
  };

  await postNewUser(data);
  res.redirect("/");
};
