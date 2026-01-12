// ============================================================================
// src/modules/auth/application/dto/auth.dto.ts
// ============================================================================
import { Role } from "@core/types";

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  name: string;
  role: Role;
}

export interface RefreshTokenDto {
  refreshToken: string;
}

export interface ForgotPasswordDto {
  email: string;
}

export interface ResetPasswordDto {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponseDto {
  user: {
    id: string;
    email: string;
    name: string;
    role: Role;
    avatarUrl?: string;
    isAdmin: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}
