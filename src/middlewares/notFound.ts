// src/middlewares/notFound.ts
import { Request, Response, NextFunction } from 'express';
import { ResponseManager } from '../utils/ResponseManager';

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  return ResponseManager.error(res, { message: 'Route not found' }, 404);
};
