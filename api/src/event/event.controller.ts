import { Request, Response } from "express";
import { EventService } from "./event.service";

export class EventsController {
  private eventService: EventService;

  constructor() {
    this.eventService = new EventService();
  }

  public async listEvents(req: Request, res: Response): Promise<void> {
    const userId = req.userID;
    if (!userId) {
      res.status(401).send("User not authenticated");
      return;
    }
    try {
      const events = await this.eventService.getEvents(userId);
      res.json(events);
    } catch (error) {
      res.status(500).send("Failed to retrieve events");
    }
  }
}
