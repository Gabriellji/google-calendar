import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
// import { setupRoutes } from "./routes";
import cookieParser from 'cookie-parser';
import authRoutes from "./auth/auth.routes";
import eventsRoutes from "./event/events.routes";

dotenv.config();

const app: Express = express();

app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authRoutes);
app.use('/calendar-events', eventsRoutes);

export default app;
