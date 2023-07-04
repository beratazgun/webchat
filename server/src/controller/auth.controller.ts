import { Request, Response } from "express";
import { client } from "../services/redis/client";

interface User {
  username: string;
  password: string;
  role?: string;
}

export default class AuthController {
  signup = (req: Request, res: Response) => {
    const { username, password, role }: User = req.body;

    client.hmset(`user:${username}`, {
      username,
      password,
      role,
    });

    res.status(200).json({
      message: "User created successfully.",
      isSuccess: true,
    });
  };

  signin = async (req: Request, res: Response) => {
    const { username, password }: User = req.body;

    const user = await client.hgetall(`user:${username}`);

    if (user.password !== password) {
      res.status(200).json({
        message: "password or username is wrong.",
        isSuccess: false,
      });
    } else {
      req.session.user = {
        username,
        password,
        role: user.role,
      };
      res.status(200).json({
        message: "User signed in successfully.",
        isSuccess: true,
        result: req.session.user,
      });
    }
  };

  getMe = async (req: Request, res: Response) => {
    const sesID = req.cookies?.sesID?.slice(2).split(".")[0] || req.sessionID;

    const user = await client.get(`sesID#${sesID}`);

    res.status(200).json({
      isSuccess: true,
      result: req.session.user ?? user,
    });
  };

  signout = async (req: Request, res: Response) => {
    const sesID = req.cookies?.sesID?.slice(2).split(".")[0] || req.sessionID;

    await client.del(`sesID#${sesID}`);

    req.session.destroy((err) => {
      res.clearCookie("sesID");
      res.status(200).json({
        status: "success",
        isSuccess: true,
        message: "You have been logged out successfully.",
      });
    });

    // res.status(200).json({
    //   message: "User signed out successfully.",
    //   isSuccess: true,
    // });
  };
}
