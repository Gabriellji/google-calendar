import { Request, Response } from "express";
import { EventService } from "./event.service";
import { EventListSuccessResponse } from "./types/event";

export class EventsController {
  private calendarService: EventService;

  constructor() {
    this.calendarService = new EventService();
  }

  public async listEvents(req: Request, res: Response): Promise<EventListSuccessResponse[]> {
    const accessToken = req.headers.authorization?.split(" ")[1];

    if (!accessToken) {
      res.status(401).send("No access token provided");
	  return;
    }

    const events = await this.calendarService.getEvents(accessToken);
    res.json(events);
  }
}
