interface ConfigInterface {
  PORT: number;
  SECRET: string;
}

export const CONFIG: ConfigInterface = {
  PORT: parseInt(process.env.PORT || "3032"),
  SECRET: process.env.SECRET || "V E R I T A S",
};
