import axios from 'axios';
import { OAuth2GrantType, OAuth2Scope } from './types/oauth2';
import { OAuth2AuthorizeParams, OAuth2AuthorizeResponseType } from './types/oauth2-authorize';
import { OAuth2RetrieveTokenParams, OAuth2TokenSuccessResponse } from './types/oauth2-token';
import { verifyIdToken } from './jwt.validator';
import { JwtPayload } from 'jsonwebtoken';


export class OAuth2Service {
	public buildAuthorizationUrl(): string {
		const params: OAuth2AuthorizeParams = {
			client_id: process.env.CLIENT_ID,
			scope: OAuth2Scope.OPENID_AND_EMAIL_AND_PROFILE_AND_CALENDAR,
			redirect_uri: new URL('http://localhost:3000/auth/google/callback').toString(),
			response_type: OAuth2AuthorizeResponseType.CODE,
		};

		const authorizationUrl = new URL(process.env.AUTH_URI);
		const serializedParams = new URLSearchParams(params);
		authorizationUrl.search = serializedParams.toString();

		return authorizationUrl.toString();
	};

	public async exchangeCodeForTokens<T extends OAuth2Scope = OAuth2Scope.NO_TOKEN> (
		authorizationCode: string,
	): Promise<JwtPayload> {
		const params: OAuth2RetrieveTokenParams = {
			client_id: process.env.CLIENT_ID,
			client_secret: process.env.CLIENT_SECRET,
			code: authorizationCode,
			grant_type: OAuth2GrantType.AUTHORIZATION_CODE,
			redirect_uri: new URL('http://localhost:3000/auth/google/callback').toString(),
		};

		const tokenUrl = new URL(process.env.TOKEN_URI);
		const serializedParams = new URLSearchParams(params);
		tokenUrl.search = serializedParams.toString();

		try {
			const { data } = await axios.post<OAuth2TokenSuccessResponse<T>>(tokenUrl.toString())
			console.log('ID TOKEN', data)
			const jwtPayload: JwtPayload = await verifyIdToken(data.id_token, process.env.CLIENT_ID);
			console.log('JWT PAYLOAD', jwtPayload)
			return {
				...jwtPayload,
				...data,
			};
		} catch (exception) {
			throw exception;
		}
	}
	
}

