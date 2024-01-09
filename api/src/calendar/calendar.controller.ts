import { Request, Response } from "express";
import { CalendarService } from "./calendar.service";

export class CalendarController {

	private calendarService: CalendarService;

	constructor() {
		this.calendarService = new CalendarService();
	}

	public async listEvents(req: Request, res: Response): Promise<any> {
		const accessToken = req.headers.authorization?.split(' ')[1];;

		if (!accessToken) {
			return res.status(401).send('No access token provided');
		}

		try {
			const events = await this.calendarService.getCalendarEvents(accessToken);
			res.json(events);
		} catch (error) {
			res.status(500).send('Failed to fetch calendar events');
		}
	}
}
