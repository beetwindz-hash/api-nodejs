// ============================================================================
// src/core/config/index.ts
// ============================================================================
import dotenv from "dotenv";
import { appConfig } from "./app.config";
import { databaseConfig } from "./database.config";
import { jwtConfig } from "./jwt.config";

dotenv.config();

export const config = {
  app: appConfig,
  database: databaseConfig,
  jwt: jwtConfig,
} as const;

export { appConfig, databaseConfig, jwtConfig };
