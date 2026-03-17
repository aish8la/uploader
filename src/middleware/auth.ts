import express from "express";

export const requireAuthentication: express.RequestHandler = (
  req,
  res,
  next,
) => {
  if (!req.isAuthenticated()) {
    return res.redirect(`/auth/login?returnTo=${req.originalUrl}`);
  }
  next();
};
