import { calendar_v3 } from "googleapis";

export interface EventRetrieveParams extends Record<string, any>  {
	maxResults: number,
	singleEvents: boolean,
	orderBy: string
}
 
export interface EventListSuccessResponse extends calendar_v3.Schema$Event {}
