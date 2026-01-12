// ============================================================================
// src/core/config/app.config.ts
// ============================================================================
export interface AppConfig {
  nodeEnv: string;
  port: number;
  apiVersion: string;
  corsOrigin: string;
  uploadPath: string;
  maxFileSize: number;
  rateLimitWindowMs: number;
  rateLimitMaxRequests: number;
  logLevel: string;
}

const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

const getEnvNumber = (key: string, defaultValue: number): number => {
  const value = process.env[key];
  return value ? parseInt(value, 10) : defaultValue;
};

export const appConfig: AppConfig = {
  nodeEnv: getEnvVar("NODE_ENV", "development"),
  port: getEnvNumber("PORT", 3000),
  apiVersion: getEnvVar("API_VERSION", "v1"),
  corsOrigin: getEnvVar("CORS_ORIGIN", "http://localhost:5173"),
  uploadPath: getEnvVar("UPLOAD_PATH", "./uploads"),
  maxFileSize: getEnvNumber("MAX_FILE_SIZE", 5242880),
  rateLimitWindowMs: getEnvNumber("RATE_LIMIT_WINDOW_MS", 900000),
  rateLimitMaxRequests: getEnvNumber("RATE_LIMIT_MAX_REQUESTS", 100),
  logLevel: getEnvVar("LOG_LEVEL", "info"),
};
