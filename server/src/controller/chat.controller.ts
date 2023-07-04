import { Request, Response } from "express";
import { client } from "../services/redis/client";

export default class ChatController {
  getChat = async (req: Request, res: Response) => {
    const { chatId } = req.params;

    const messages = await client.lrange(`chat#${chatId}`, 0, -1);

    const parsedMessages = messages.map((message) => JSON.parse(message));

    parsedMessages.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    return res.status(200).json({
      isSuccess: true,
      result: parsedMessages.sort((a, b) => b.date - a.date),
    });
  };
}
