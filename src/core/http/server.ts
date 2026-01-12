// ============================================================================
// src/core/http/server.ts
// ============================================================================
import { Application } from "express";
import { Server } from "http";
import { appConfig } from "@core/config";
import { database } from "@core/database";
import { logger } from "@core/utils";
import { createApp } from "./app";

export class AppServer {
  private app: Application;
  private server?: Server;

  constructor() {
    this.app = createApp();
  }

  async start(): Promise<void> {
    try {
      // Connect to database
      await database.connect();

      // Start HTTP server
      this.server = this.app.listen(appConfig.port, () => {
        logger.info(`Server started on port ${appConfig.port}`);
        logger.info(`Environment: ${appConfig.nodeEnv}`);
        logger.info(`API Version: ${appConfig.apiVersion}`);
      });

      this.setupGracefulShutdown();
    } catch (error) {
      logger.error("Failed to start server:", error);
      process.exit(1);
    }
  }

  private setupGracefulShutdown(): void {
    const shutdown = async (signal: string) => {
      logger.info(`${signal} received, shutting down gracefully...`);

      if (this.server) {
        this.server.close(async () => {
          logger.info("HTTP server closed");
          await database.disconnect();
          process.exit(0);
        });

        // Force shutdown after 30 seconds
        setTimeout(() => {
          logger.error("Forced shutdown after timeout");
          process.exit(1);
        }, 30000);
      }
    };

    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("SIGINT", () => shutdown("SIGINT"));
  }

  getApp(): Application {
    return this.app;
  }
}
