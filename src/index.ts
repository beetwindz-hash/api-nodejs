// ============================================================================
// src/index.ts
// ============================================================================
import "express-async-errors";
import { AppServer } from "@core/http/server";
import { logger } from "@core/utils";

const bootstrap = async () => {
  try {
    logger.info("Starting Bennet Eddar API...");
    const server = new AppServer();
    await server.start();
  } catch (error) {
    logger.error("Failed to bootstrap application:", error);
    process.exit(1);
  }
};

bootstrap();
