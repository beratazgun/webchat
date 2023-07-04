import { Router, Request, Response } from "express";
import HelpRequestController from "../controller/helpRequest.controller";

const router = Router();
const helpRequestController = new HelpRequestController();

router.post("/create-help-request", helpRequestController.createHelpRequest);

router.get("/get-all-help-requests", helpRequestController.getAllHelpRequests);

router.get("/chat/:chatId", helpRequestController.getHelpRequest);

router.post(
  "/accept-help-request/:chatId",
  helpRequestController.acceptHelpRequest
);

router.post(
  "/terminate-help-request/:chatId",
  helpRequestController.terminateHelpRequest
);

export default router;
