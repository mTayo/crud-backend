/// <reference path="../types/express/index.d.ts" />


import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ResponseManager } from '../utils/ResponseManager';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in the environment variables');
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return ResponseManager.error(res, { message: 'Unauthorized: No token provided' }, 401);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload & { userId: string };
    // @ts-ignore
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err)
    return ResponseManager.error(res, { message: 'Unauthorized: Invalid token' }, 401);
  }
};
