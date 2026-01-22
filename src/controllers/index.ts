import express from "express";

export const getRoot: express.RequestHandler = (req, res) => {
  const isAuth = req.isAuthenticated();
  res.render("index", {
    isAuth,
  });
};
