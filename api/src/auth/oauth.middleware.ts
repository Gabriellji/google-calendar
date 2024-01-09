import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

interface GoogleUserInfo {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
}

declare global {
  namespace Express {
    interface Request {
      user?: GoogleUserInfo;
    }
  }
}

export const retrieveUserInfo = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.headers.authorization?.split(' ')[1];

  if (!accessToken) {
    return res.status(401).json({ message: "No access token provided" });
  }

  try {
    const googleApiUrl = 'https://www.googleapis.com/oauth2/v3/userinfo';
    const response = await axios.get<GoogleUserInfo>(googleApiUrl, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    req.user = response.data;

	console.log('USER', req.user)
    next();
  } catch (error) {
    console.error('Error fetching user info:', error);
    res.status(500).json({ message: "Failed to fetch user info" });
  }
};
