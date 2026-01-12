// ============================================================================
// src/core/database/connection.ts
// ============================================================================
import mongoose from "mongoose";
import { databaseConfig } from "@core/config";
import { logger } from "@core/utils";

export class DatabaseConnection {
  private static instance: DatabaseConnection;
  private isConnected: boolean = false;

  private constructor() {}

  static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  async connect(): Promise<void> {
    if (this.isConnected) {
      logger.info("Database already connected");
      return;
    }

    try {
      const uri =
        process.env.NODE_ENV === "test"
          ? databaseConfig.testUri
          : databaseConfig.uri;

      await mongoose.connect(uri, databaseConfig.options);

      this.isConnected = true;
      logger.info("MongoDB connected successfully");

      mongoose.connection.on("error", (error) => {
        logger.error("MongoDB connection error:", error);
        this.isConnected = false;
      });

      mongoose.connection.on("disconnected", () => {
        logger.warn("MongoDB disconnected");
        this.isConnected = false;
      });

      process.on("SIGINT", async () => {
        await this.disconnect();
        process.exit(0);
      });
    } catch (error) {
      logger.error("MongoDB connection failed:", error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    if (!this.isConnected) {
      return;
    }

    try {
      await mongoose.connection.close();
      this.isConnected = false;
      logger.info("MongoDB disconnected");
    } catch (error) {
      logger.error("Error disconnecting from MongoDB:", error);
      throw error;
    }
  }

  getConnection(): typeof mongoose {
    return mongoose;
  }

  isConnectionActive(): boolean {
    return this.isConnected;
  }
}

export const database = DatabaseConnection.getInstance();
