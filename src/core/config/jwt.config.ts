// ============================================================================
// src/core/config/jwt.config.ts
// ============================================================================
export interface JwtConfig {
  secret: string;
  refreshSecret: string;
  expiresIn: string;
  refreshExpiresIn: string;
}

export const jwtConfig: JwtConfig = {
  secret: getEnvVar("JWT_SECRET"),
  refreshSecret: getEnvVar("JWT_REFRESH_SECRET"),
  expiresIn: getEnvVar("JWT_EXPIRES_IN", "1h"),
  refreshExpiresIn: getEnvVar("JWT_REFRESH_EXPIRES_IN", "7d"),
};
