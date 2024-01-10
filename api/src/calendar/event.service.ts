import axios from 'axios';
import { EventRetrieveParams, EventListSuccessResponse } from './types/event';

export class EventService {

  public async getEvents(accessToken: string, calendarId: string = 'primary'): Promise<EventListSuccessResponse[]> {

	const calendarApiUrl = new URL(`${process.env.GOOGLE_API_BASE_URL}/calendar/v3/calendars/${calendarId}/events`);

    const params: EventRetrieveParams = {
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime'
    };

    calendarApiUrl.search = new URLSearchParams(params).toString();

    try {
        const response = await axios.get(calendarApiUrl.toString(), {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json'
            }
        });
        return response.data.items;
    } catch (error) {
        throw error;
    }
  }

}

