import z from "zod";
import type { RequestHandler } from "express";
import { $ZodError } from "zod/v4/core";

type RequestValidationSchema = {
  bodySchema?: z.ZodSchema;
  paramSchema?: z.ZodSchema;
};

const parseSchema = async (data: unknown, schema: z.ZodSchema) => {
  return await schema.parseAsync(data, {
    reportInput: true,
  });
};

export const validation = (
  schemaObject: RequestValidationSchema,
  redirect?: string,
): RequestHandler => {
  const middleware: RequestHandler = async (req, res, next) => {
    try {
      req.validatedInput = {
        body: schemaObject.bodySchema
          ? await parseSchema(req.body, schemaObject.bodySchema)
          : null,
        params: schemaObject.paramSchema
          ? await parseSchema(req.params, schemaObject.paramSchema)
          : null,
      };
      return next();
    } catch (e) {
      if (e instanceof $ZodError) {
        req.session.inputErrors = z.flattenError(e);
        return req.session.save((err) => {
          if (err) return next(err);
          if (redirect) {
            return res.redirect(redirect);
          }
          next();
        });
      }
      return next(e);
    }
  };
  return middleware;
};

export const getPreviousReqError: RequestHandler = (req, res, next) => {
  if (!req?.session?.inputErrors) {
    return next();
  }

  res.locals.inputErrors = req.session.inputErrors;
  delete req.session.inputErrors;
  req.session.save((err) => {
    if (err) return next(err);
    next();
  });
};
