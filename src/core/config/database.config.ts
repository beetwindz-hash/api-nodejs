// ============================================================================
// src/core/config/database.config.ts
// ============================================================================
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
