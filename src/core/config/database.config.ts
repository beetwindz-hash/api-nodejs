// ============================================================================
// src/core/config/database.config.ts
// ============================================================================
import dotenv from "dotenv";
dotenv.config();
export interface DatabaseConfig {
  uri: string;
  testUri: string;
  options: {
    maxPoolSize: number;
    minPoolSize: number;
    serverSelectionTimeoutMS: number;
    socketTimeoutMS: number;
  };
}

const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;
  if (!value && !defaultValue) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value!;
};

export const databaseConfig: DatabaseConfig = {
  uri: getEnvVar("MONGODB_URI"),
  testUri: getEnvVar(
    "MONGODB_TEST_URI",
    "mongodb://localhost:27017/bennet-eddar-test"
  ),
  options: {
    maxPoolSize: 10,
    minPoolSize: 2,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  },
};
