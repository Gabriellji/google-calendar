import { OAuth2Scope } from "./oauth2"
import { OAuth2ErrorResponse } from "./oauth2-error"

export enum OAuth2AuthorizeResponseType {
	CODE = 'code',
	ID_TOKEN = 'id_token',
	TOKEN = 'token'
}

export interface OAuth2AuthorizeParams extends Record<string, string> {
	client_id: string
	login_hint?: string
	nonce?: string
	redirect_uri: string
	response_type: OAuth2AuthorizeResponseType
	scope?: OAuth2Scope
}

export interface OAuth2AuthorizeSuccessResponse {
	code: string
}

export interface OAuth2AuthorizeErrorResponse extends OAuth2ErrorResponse {}
