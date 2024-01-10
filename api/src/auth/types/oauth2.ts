export enum OAuth2GrantType {
	AUTHORIZATION_CODE = 'authorization_code',
	REFRESH_TOKEN = 'refresh_token',
}

export enum OAuth2Scope {
	REFRESH_TOKEN = 'offline_access',
	OPENID_TOKEN = 'openid',
	OPENID_AND_REFRESH_TOKEN = 'openid offline_access',
	OPENID_AND_EMAIL_AND_PROFILE_AND_CALENDAR = 'openid email profile https://www.googleapis.com/auth/calendar.readonly',
	NO_TOKEN = ''
}
