import { Request, Response } from "express";
import { OAuth2Service } from "./oauth2.service";
import { OAuth2Scope } from "./types/oauth2";
import { UserService } from "../user/user.service";
import { User } from "../user/user.model";

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

	  console.log('RESPONSE', response)

    const existingUser = await this.userService.getUser(response.sub);

    if (!existingUser) {
      console.log("Creating new user");
      const newUser = new User({
        userId: response.sub,
        email: response.email,
        firstName: response.given_name,
        lastName: response.family_name,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await this.userService.createUser(newUser);
    }

    const clientRedirectUrl = `${process.env.CLIENT_URL}/login/oauth-callback?accessToken=${response.access_token}`;
    res.redirect(clientRedirectUrl);
  }

  async logout(req: Request, res: Response): Promise<void> {
    const accessToken = req.headers.authorization?.split(" ")[1];
    await this.oAuth2Service.revokeToken(accessToken);
    await this.userService.deleteUser(req.userID);
    res.status(200).send("User deleted");
  }
}
