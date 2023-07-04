import path from "path";
import express, { Express } from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import dotenv from "dotenv";
import sessions from "express-session";
import RedisStore from "connect-redis";
import cors from "cors";
import Socket from "./services/socket/Socket";

import { client } from "./services/redis/client";
dotenv.config();

import authRoutes from "./routes/auth.routes";
import helpRequestRoutes from "./routes/helpRequest.routes";
import chatRoutes from "./routes/chat.routes";

const app: Express = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3005"],
  },
});

const port: number = Number(process.env.PORT) || 3005;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.use(
  cors({
    credentials: true, // This is important.
    origin: ["http://localhost:3000", "http://localhost:3005"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  })
);

app.use(
  sessions({
    store: new RedisStore({
      client: client,
      prefix: "sesID#",
    }),
    name: "sesID",
    secret: "webchat",
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
      secure: false,
    },
    resave: true,
    saveUninitialized: false,
  })
);

const socket = new Socket(io);
socket.socketEvents();

app.use("/", authRoutes);
app.use("/help", helpRequestRoutes);
app.use("/chat", chatRoutes);

httpServer.listen(port, () => {
  console.log(`
  🚀🚀🚀 Server running on port ${port}`);
});
