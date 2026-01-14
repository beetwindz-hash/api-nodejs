// ============================================================================
// src/core/config/jwt.config.ts
// ============================================================================
export interface JwtConfig {
  secret: string;
  refreshSecret: string;
  expiresIn: string;
  refreshExpiresIn: string;
}

const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;
  if (!value && !defaultValue) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value!;
};

const baseSecret = getEnvVar("JWT_SECRET");

export const jwtConfig: JwtConfig = {
  // Use JWT_SECRET as the primary secret, and fall back to it for refresh
  // tokens if JWT_REFRESH_SECRET is not provided in .env
  secret: baseSecret,
  refreshSecret: process.env.JWT_REFRESH_SECRET || baseSecret,
  // Align expiry config with provided .env (JWT_EXPIRES_IN)
  expiresIn: getEnvVar("JWT_EXPIRES_IN", "60804000"),
  refreshExpiresIn: getEnvVar("JWT_REFRESH_EXPIRES_IN", "60804000"),
};
