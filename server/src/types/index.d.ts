declare global {
  declare module "express-session" {
    interface SessionData {
      user: {
        username: string;
        password: string;
        role: string;
      };
    }
  }
}
