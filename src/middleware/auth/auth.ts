import express from "express";

export const isAuthenticated: express.RequestHandler = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.redirect("/auth/login");
};
