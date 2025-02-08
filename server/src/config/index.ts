export const config = {
  PORT: process.env.PORT || 3032,
  SECRET_KEY: process.env.SECRET_KEY || "default-secret-key",
  BCRYPT_SALT_ROUNDS: parseInt(process.env.BCRYPT_SALT_ROUNDS || "10"),
};
