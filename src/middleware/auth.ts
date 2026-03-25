import express from "express";
import { getFolder } from "../services/fileService.js";
import type { AuthenticatedRequest, ValidatedInput } from "../types/global.js";
import type { FolderID } from "../schemas/validation.schema.js";
import { ForbiddenError } from "./error.js";

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

export const requireFolderAccess: express.RequestHandler = async (
  req,
  res,
  next,
) => {
  const { user } = req as AuthenticatedRequest;

  const { params } = req.validatedInput as ValidatedInput<unknown, FolderID>;

  if (!params?.folderId) {
    return next();
  }

  const result = await getFolder(user.id, params.folderId);
  if (!result) {
    return next(new ForbiddenError());
  }
  next();
};
