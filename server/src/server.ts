import { app } from "./app";
import { logger } from "./utils/Logger";

app.listen({ port: process.env.PORT || 3032 });

logger.info(`Server running at ${app.server?.url}`);
