import { Express } from "express";
import { AuthController } from "./auth/auth.controller";
import { EventsController } from "./calendar/event.controller";
import { retrieveUserInfo } from "./auth/oauth2.middleware";

export function setupRoutes(app: Express) {
  const authController = new AuthController();
  const calendarController = new EventsController();

  app.get("/", (req, res) => res.send("Service is running!"));

  app.get("/auth/login", (req, res) => authController.login(req, res));
  app.post("/auth/logout", retrieveUserInfo, (req, res) =>
    authController.logout(req, res)
  );
  app.get("/auth/google/callback", (req, res) =>
    authController.callback(req, res)
  );

  app.get("/calendar-events", retrieveUserInfo, (req, res) =>
    calendarController.listEvents(req, res)
  );
}
