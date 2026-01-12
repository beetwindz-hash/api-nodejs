// ============================================================================
// src/core/utils/jwt.util.ts
// ============================================================================
import jwt from "jsonwebtoken";
import { jwtConfig } from "@core/config";
import { UnauthorizedError } from "@core/errors";

export interface JwtPayload {
  userId: string;
  email: string;
  role: string;
  type?: "access" | "refresh";
}

export class JwtUtil {
  static generateAccessToken(payload: Omit<JwtPayload, "type">): string {
    return jwt.sign({ ...payload, type: "access" }, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn,
    });
  }

  static generateRefreshToken(payload: Omit<JwtPayload, "type">): string {
    return jwt.sign({ ...payload, type: "refresh" }, jwtConfig.refreshSecret, {
      expiresIn: jwtConfig.refreshExpiresIn,
    });
  }

  static verifyAccessToken(token: string): JwtPayload {
    try {
      const decoded = jwt.verify(token, jwtConfig.secret) as JwtPayload;
      if (decoded.type !== "access") {
        throw new UnauthorizedError("Invalid token type");
      }
      return decoded;
    } catch (error) {
      if (error instanceof UnauthorizedError) throw error;
      throw new UnauthorizedError("Invalid or expired token");
    }
  }

  static verifyRefreshToken(token: string): JwtPayload {
    try {
      const decoded = jwt.verify(token, jwtConfig.refreshSecret) as JwtPayload;
      if (decoded.type !== "refresh") {
        throw new UnauthorizedError("Invalid token type");
      }
      return decoded;
    } catch (error) {
      if (error instanceof UnauthorizedError) throw error;
      throw new UnauthorizedError("Invalid or expired refresh token");
    }
  }

  static decode(token: string): JwtPayload | null {
    try {
      return jwt.decode(token) as JwtPayload;
    } catch {
      return null;
    }
  }
}
