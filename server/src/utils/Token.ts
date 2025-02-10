import { config } from "@/config";
import jwt from "jsonwebtoken";

export const generateToken = (payload: object) => {
  return jwt.sign(payload, config.SECRET_KEY, { expiresIn: "1d" });
};

export const verifyToken = (token: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.SECRET_KEY, (err, decoded) => {
      if (err?.message === "jwt expired") {
        return reject("Token expired");
      } else if (err) {
        return reject("Unauthorized");
      }
      resolve(decoded);
    });
  });
};
