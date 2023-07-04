import { Router } from "express";
import AuthController from "../controller/auth.controller";

const router = Router();
const authController = new AuthController();

router.get("/get-user", authController.getMe);

router.post("/signin", authController.signin);

router.post("/signup", authController.signup);

router.post("/signout", authController.signout);

export default router;
