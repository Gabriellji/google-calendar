import type { OAuth2GrantType, OAuth2Scope } from "./oauth2";
import { Session } from "express-session";

interface OAuth2TokenParams {
  client_id: string;
  client_secret: string;
}

export interface OAuth2RetrieveTokenParams
  extends OAuth2TokenParams,
    Record<string, string> {
  code: string;
  grant_type: OAuth2GrantType.AUTHORIZATION_CODE;
  redirect_uri: string;
}

interface OAuth2TokenSuccessResponseBase {
  access_token: string;
  expires_in: number;
  token_type: "Bearer";
  userId: string;
}

interface RefreshTokenScopeResponse {
  refresh_token: string;
  refresh_token_id: string;
}

interface OpenidTokenScopeResponse {
  id_token: string;
}

export interface OAuth2RenewTokenParams extends OAuth2TokenParams {
  grant_type: OAuth2GrantType.REFRESH_TOKEN;
  refresh_token: RefreshTokenScopeResponse["refresh_token"];
  access_token?: OAuth2TokenSuccessResponseBase["access_token"];
}

export type OAuth2TokenSuccessResponse<T extends OAuth2Scope> =
  OAuth2TokenSuccessResponseBase &
    (T extends OAuth2Scope.REFRESH_TOKEN
      ? RefreshTokenScopeResponse
      : Record<string, never>) &
    (T extends OAuth2Scope.OPENID_TOKEN
      ? OpenidTokenScopeResponse
      : Record<string, never>) &
    (T extends OAuth2Scope.OPENID_AND_EMAIL_AND_PROFILE_AND_CALENDAR
      ? OpenidTokenScopeResponse & RefreshTokenScopeResponse
      : Record<string, never>);

export interface OpenidTokenPayload {
  iss: string;
  azp: number;
  aud: number;
  sub: string;
  at_hash: string;
  hd: string;
  email: string;
  email_verified: boolean;
  iat: number;
  exp: number;
  nonce: string;
}
