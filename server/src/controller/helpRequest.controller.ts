import { Request, Response } from "express";
import { generateChatId } from "../utils/generateChatId";
import { helpRequest } from "../services/redis/keys";
import { client } from "../services/redis/client";

export default class HelpRequestController {
  createHelpRequest = async (req: Request, res: Response) => {
    const chatId = generateChatId();

    const username = req?.session?.user?.username;

    const helpReq = await client.set(
      helpRequest(chatId),
      JSON.stringify({
        chatId,
        username,
        isAccepted: false,
        isCompleted: false,
        customerRepresentative: "",
      })
    );

    if (!helpReq) {
      return res.status(400).json({
        message: "Help request could not be created.",
        isSuccess: false,
      });
    }

    res.status(200).json({
      message: "Help request created.",
      chatId: chatId,
      isSuccess: true,
    });
  };

  getAllHelpRequests = async (req: Request, res: Response) => {
    const allHelpRequestsKeys = (await client.keys(
      helpRequest("*")
    )) as string[];

    const allHelpRequests = await Promise.all(
      allHelpRequestsKeys.map(async (key) => {
        const data = await client.get(key);
        if (data !== null) {
          return JSON.parse(data);
        }
      })
    );

    const allHelpRequestsFiltered = allHelpRequests.filter(
      (helpRequest) =>
        helpRequest.isAccepted === false && helpRequest.isCompleted === false
    );

    res.status(200).json({
      message: "All help requests.",
      result: allHelpRequestsFiltered,
      isSuccess: true,
    });
  };

  acceptHelpRequest = async (req: Request, res: Response) => {
    const { chatId } = req.params;

    const findChat = await client.get(helpRequest(chatId));

    if (!findChat) {
      res.status(400).json({
        message: "Help request does not exist.",
        isSuccess: false,
      });
    } else {
      const parsedChat = JSON.parse(findChat);

      const updatedChat = await client.set(
        helpRequest(chatId),
        JSON.stringify({
          ...parsedChat,
          isAccepted: true,
          customerRepresentative: req?.session?.user?.username as string,
        })
      );

      if (!updatedChat) {
        return res.status(400).json({
          message: "Help request could not be accepted.",
          isSuccess: false,
        });
      }

      res.status(200).json({
        message: "Help request accepted.",
        isSuccess: true,
      });
    }
  };

  getHelpRequest = async (req: Request, res: Response) => {
    const { chatId } = req.params;

    const findChat = await client.get(helpRequest(chatId));

    if (!findChat) {
      res.status(400).json({
        message: "Help request does not exist.",
        isSuccess: false,
      });
    } else {
      const parsedChat = JSON.parse(findChat);

      res.status(200).json({
        message: "Help request.",
        result: parsedChat,
        isSuccess: true,
      });
    }
  };

  terminateHelpRequest = async (req: Request, res: Response) => {
    const { chatId } = req.params;

    const findChat = await client.get(helpRequest(chatId));

    if (!findChat) {
      res.status(400).json({
        message: "Help request does not exist.",
        isSuccess: false,
      });
    } else {
      const parsedChat = JSON.parse(findChat);

      const updatedChat = await client.set(
        helpRequest(chatId),
        JSON.stringify({
          ...parsedChat,
          isCompleted: true,
        })
      );

      // const deleteChat = await client.del(helpRequest(chatId));

      if (!updatedChat) {
        return res.status(400).json({
          message: "Help request could not be terminated.",
          isSuccess: false,
        });
      }

      res.status(200).json({
        message: "Help request terminated.",
        isSuccess: true,
        role: req?.session?.user?.role,
      });
    }
  };
}
