export interface CalendarRetrieveEventParams extends Record<string, any>  {
	maxResults: number,
	singleEvents: boolean,
	orderBy: string
}
