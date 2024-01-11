import axios from 'axios';
import { EventRetrieveParams, EventListSuccessResponse } from './types/event';
import { UserService } from '../user/user.service';

export class EventService {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public async getEvents(userId: string, calendarId: string = 'primary'): Promise<EventListSuccessResponse[]> {
    const user = await this.userService.getUser(userId);

    if (!user || !user.tokens.access_token) {
      throw new Error('Access token not found');
    }

    const accessToken = user.tokens.access_token;
    const calendarApiUrl = new URL(`${process.env.GOOGLE_API_BASE_URL}/calendar/v3/calendars/${calendarId}/events`);

	const now = new Date().toISOString();

	const params: EventRetrieveParams = {
	  maxResults: 10,
	  singleEvents: true,
	  orderBy: 'startTime',
	  timeMin: now,
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

