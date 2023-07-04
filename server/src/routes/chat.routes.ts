import { Router } from "express";
import ChatController from "../controller/chat.controller";

const router = Router();
const chatController = new ChatController();

router.get("/get-chat-messages/:chatId", chatController.getChat);

export default router;
