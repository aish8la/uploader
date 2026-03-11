import express from "express";

export const getRoot: express.RequestHandler = (req, res) => {
  const isAuth = req.isAuthenticated();
  if (isAuth) {
    return res.redirect("my-drive");
  }
  res.redirect("auth/login");
};
