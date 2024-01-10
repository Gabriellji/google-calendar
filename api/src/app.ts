import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { setupRoutes } from "./routes";

dotenv.config();

const app: Express = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

setupRoutes(app);

export default app;
