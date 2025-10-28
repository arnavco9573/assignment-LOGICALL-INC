// src/middleware/validate.ts
import { Request, Response, NextFunction } from 'express';
import { ZodObject, ZodError } from 'zod';

export const validate = (schema: ZodObject) => 
  (req: Request, res: Response, next: NextFunction) => {
    try {
      // Parse and validate the request
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      // If successful, move to the next function (the controller)
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // If validation fails, send a 400 error
        return res.status(400).json({
          message: 'Input validation failed',
          errors: error.flatten().fieldErrors,
        });
      }
      // Handle other unexpected errors
      return res.status(500).json({ message: 'Internal server error' });
    }
  };