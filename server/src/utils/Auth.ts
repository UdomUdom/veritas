import { config } from "@/config";
import jwt from "jsonwebtoken";

export const generateToken = (payload: object) => {
  return jwt.sign(payload, config.SECRET_KEY, { expiresIn: "1h" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, config.SECRET_KEY);
};
