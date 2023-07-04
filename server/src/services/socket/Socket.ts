import { Server } from "socket.io";
import dotenv from "dotenv";
dotenv.config();
import { createAdapter } from "@socket.io/redis-adapter";
import { client } from "../redis/client";

interface WelcomeMessage {
  username: string;
  message: string;
  date: string;
}

export default class Socket {
  constructor(public io: Server) {}

  RedisAdaptor() {
    const pubClient = client;
    const subClient = pubClient.duplicate();
    const redisAdapter = createAdapter(pubClient, subClient);
    this.io.adapter(redisAdapter);
  }

  async sendWelcomeMessage(username: string, chatId: string, role: string) {
    if (role === "customer") {
      const welcomeMessage = {
        username: "Chat Bot",
        message: `Welcome to the chat ${username}! Delegate will be with you shortly.`,
        date: new Date().toISOString(),
      };

      // This is the event that will be triggered when a user joins the chat.
      this.io.to(chatId).emit("receive-message", welcomeMessage);

      await client.lpush(
        `chat#${chatId}`,
        JSON.stringify({
          username: "Chat Bot",
          message: welcomeMessage.message,
          date: welcomeMessage.date,
        })
      );
    }
  }

  socketEvents() {
    this.RedisAdaptor();
    const userMap: Map<string, { username: string; role: string }> = new Map();
    let isSendWelcomeMessage = false;

    this.io.on("connection", (socket) => {
      socket.on("join-chat", async ({ username, chatId }) => {
        const user = await client.hgetall(`user:${username}`);
        userMap.set(socket.id, { username, role: user.role });
        // console.log(`User ${username} ${socket.id} joined the room ${chatId}`);

        // This allows the user to join the chat
        socket.join(chatId);

        if (!isSendWelcomeMessage) {
          this.sendWelcomeMessage(username, chatId, user.role);
          isSendWelcomeMessage = true;
        }

        // This is the event that will be triggered when a message is sent.
        socket.on("send-message", async ({ message, chatId, date }) => {
          this.io.to(chatId).emit("receive-message", {
            username,
            message,
            date,
          });

          await client.lpush(
            `chat#${chatId}`,
            JSON.stringify({ username, message, date })
          );

          // console.log(
          //   `User ${username} ${socket.id} sent a message to room ${chatId}. Message: ${message}`
          // );
        });
      });

      socket.on("leave-chat", ({ username, chatId }) => {
        socket.leave(chatId);
        console.log(`User ${username} ${socket.id} left the room ${chatId}`);
      });
    });
  }
}
