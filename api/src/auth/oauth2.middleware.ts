import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import { Oauth2UserInfo } from './types/oauth2-user-info';

declare global {
  namespace Express {
    interface Request {
      userID?: string;
    }
  }
}

export async function retrieveUserInfo(req: Request, res: Response, next: NextFunction): Promise<void> {
  const accessToken = req.headers.authorization?.split(' ')[1];

  if (!accessToken) {
    res.status(401).json({ message: "No access token provided" });
	return;
  }

  try {
    const googleApiUrl = `${process.env.GOOGLE_API_BASE_URL}/oauth2/v3/userinfo`;
    const response = await axios.get<Oauth2UserInfo>(googleApiUrl, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    req.userID = response.data.sub;
    next();
  } catch (error) {
    console.error('Error fetching user info:', error);
    res.status(500).json({ message: "Failed to fetch user info" });
  }
};
