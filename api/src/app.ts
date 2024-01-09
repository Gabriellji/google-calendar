import express from "express";
import { Request, Response, NextFunction, Express } from "express";
import { AuthController } from "./auth/auth.controller";
import { CalendarController } from "./calendar/calendar.controller";
import { retrieveUserInfo } from "./auth/oauth.middleware";
import dotenv from 'dotenv';

const app: Express = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use("/", (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl === "/") {
    res.send("Service is running!");
    return;
  }
  next();
});

const authController = new AuthController();
const calendarController = new CalendarController();

app.get("/auth/login", (req, res) => authController.login(req, res));
app.get("/auth/logout", retrieveUserInfo, (req, res) => authController.logout(req, res));
app.get("/auth/google/callback", (req, res) =>
  authController.callback(req, res)
);

app.get("/calendar-events", retrieveUserInfo, (req, res) => calendarController.listEvents(req, res));



// app.get('/auth/google', authController.login());
// app.get('/auth/google/callback', AuthController.handleOAuthCallback);

// app.use('/auth', authController);

export default app;
