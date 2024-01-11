import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppSessionKey } from './types/session';

declare global {
  namespace Express {
    interface Request {
      userID?: any;
    }
  }
}

export async function authMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
  const sessionToken = req.cookies[AppSessionKey.SESSION_TOKEN];

  if (!sessionToken) {
    res.status(401).json({ message: "Session token not provided" });
    return;
  }

  try {
    const decoded = jwt.verify(sessionToken, process.env.JWT_SECRET);
    req.userID = (decoded as any).userId;

    next();
  } catch (error) {
    console.error('Error verifying session token:', error);
    res.status(401).json({ message: "Invalid session token" });
  }
}
