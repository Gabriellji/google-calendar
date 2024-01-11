import { Request, Response } from "express";
import { OAuth2Service } from "./oauth2.service";
import { OAuth2Scope } from "./types/oauth2";
import { UserService } from "../user/user.service";
import { User } from "../user/user.model";
import { AppSessionKey } from "./types/session";
import { createSessionToken } from "./jwt.util";

export class AuthController {
  private oAuth2Service: OAuth2Service;
  private userService: UserService;

  constructor() {
    this.oAuth2Service = new OAuth2Service();
    this.userService = new UserService();
  }

  public login(_req: Request, res: Response): void {
    const url = this.oAuth2Service.buildAuthorizationUrl();
    res.redirect(url);
  }

  public async callback(req: Request, res: Response): Promise<void> {
    const code = req.query.code as string;

    const response =
      await this.oAuth2Service.exchangeCodeForTokens<OAuth2Scope.OPENID_AND_EMAIL_AND_PROFILE_AND_CALENDAR>(
        code
      );

    const existingUser = await this.userService.getUser(response.sub);

    if (!existingUser) {
      const newUser = new User({
        userId: response.sub,
        email: response.email,
        firstName: response.given_name,
        lastName: response.family_name,
        tokens: {
          access_token: response.access_token,
          refresh_token: response.refresh_token || null,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await this.userService.createUser(newUser);
    } else {
      await this.userService.updateUser(response.sub, {
        tokens: {
          access_token: response.access_token,
          refresh_token: response.refresh_token || null,
        },
      });
    }

    const sessionToken = createSessionToken(response.sub);
    res.cookie(AppSessionKey.SESSION_TOKEN, sessionToken, {}); // { httpOnly: true, secure: true }
    res.redirect(process.env.CLIENT_URL + "/login/oauth-callback");
  }

  checkSession(req: Request, res: Response): void {
    res.status(200).send("Session is valid");
  }

  async logout(req: Request, res: Response): Promise<void> {
    res.clearCookie(AppSessionKey.SESSION_TOKEN);

    const user = await this.userService.getUser(req.userID);
    await this.oAuth2Service.revokeToken(user.tokens.access_token);

    await this.userService.deleteUser(req.userID);
    res.status(200).send("Logged out successfully");
  }
}
