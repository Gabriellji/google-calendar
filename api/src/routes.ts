import { Express } from "express";
import { AuthController } from "./auth/auth.controller";
import { EventsController } from "./event/event.controller";
import { authMiddleware } from "./auth/auth.middleware";

export function setupRoutes(app: Express) {
  const authController = new AuthController();
  const calendarController = new EventsController();

  app.get("/", (req, res) => res.send("Service is running!"));

  // merge all auth with app.use
  app.get("/auth/login", (req, res) => authController.login(req, res));
  
  app.get("/auth/check-session", authMiddleware, (req, res) =>
    authController.checkSession(req, res)
  );
  app.post("/auth/logout", authMiddleware, (req, res) =>
    authController.logout(req, res)
  );
  app.get("/auth/google/callback", (req, res) =>
    authController.callback(req, res)
  );

  app.get("/calendar-events", authMiddleware, (req, res) =>
    calendarController.listEvents(req, res)
  );
}
