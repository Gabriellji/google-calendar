import axios from 'axios';
import { CalendarRetrieveEventParams } from './types/calendar-events';

export class CalendarService {

  public async getCalendarEvents(accessToken: string, calendarId: string = 'primary'): Promise<CalendarEvent[]> {

	const calendarApiUrl = new URL(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`);

    const params: CalendarRetrieveEventParams = {
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
		console.log('RESP', response.data)
        return response.data;
    } catch (error) {
        console.error('Error fetching calendar events:', (error as any).response.data.error);
        throw error;
    }
  }

}

type CalendarEvent = {
};
