interface Config {
  PORT: number;
  SECRET_KEY: string;
  BCRYPT_SALT_ROUNDS: number;
  COOKIE: {
    httpOnly: boolean;
    sameSite: "strict" | "lax" | "none";
    secure: boolean;
    priority: "low" | "medium" | "high";
    maxAge: number;
  };
}

const prod = process.env.NODE_ENV === "production";

export const config: Config = {
  PORT: parseInt(process.env.PORT || "3032"),
  SECRET_KEY: process.env.SECRET_KEY || "veritas-secret-key",
  BCRYPT_SALT_ROUNDS: parseInt(process.env.BCRYPT_SALT || "10"),
  COOKIE: {
    httpOnly: prod,
    sameSite: prod ? "strict" : "lax",
    secure: prod,
    priority: prod ? "high" : "low",
    maxAge: 1000 * 60 * 60 * 24,
  },
};
