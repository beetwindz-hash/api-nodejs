// src/modules/auth/domain/entities/user.entity.ts
import { Role } from "@core/types";

export interface UserProps {
  id: string;
  email: string;
  password: string;
  name: string;
  role: Role;
  avatarUrl?: string;
  isAdmin: boolean;
  isVerified: boolean;
  isActive: boolean;
  refreshToken?: string;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export class UserEntity {
  private constructor(private props: UserProps) {}

  static create(
    props: Omit<UserProps, "id" | "createdAt" | "updatedAt">
  ): UserEntity {
    return new UserEntity({
      ...props,
      id: "", // Will be set by repository
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static fromPersistence(props: UserProps): UserEntity {
    return new UserEntity(props);
  }

  get id(): string {
    return this.props.id;
  }

  get email(): string {
    return this.props.email;
  }

  get password(): string {
    return this.props.password;
  }

  get name(): string {
    return this.props.name;
  }

  get role(): Role {
    return this.props.role;
  }

  get avatarUrl(): string | undefined {
    return this.props.avatarUrl;
  }

  get isAdmin(): boolean {
    return this.props.isAdmin;
  }

  get isVerified(): boolean {
    return this.props.isVerified;
  }

  get isActive(): boolean {
    return this.props.isActive;
  }

  get refreshToken(): string | undefined {
    return this.props.refreshToken;
  }

  get passwordResetToken(): string | undefined {
    return this.props.passwordResetToken;
  }

  get passwordResetExpires(): Date | undefined {
    return this.props.passwordResetExpires;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  updateRefreshToken(token: string): void {
    this.props.refreshToken = token;
    this.props.updatedAt = new Date();
  }

  setPasswordResetToken(token: string, expires: Date): void {
    this.props.passwordResetToken = token;
    this.props.passwordResetExpires = expires;
    this.props.updatedAt = new Date();
  }

  clearPasswordResetToken(): void {
    this.props.passwordResetToken = undefined;
    this.props.passwordResetExpires = undefined;
    this.props.updatedAt = new Date();
  }

  updatePassword(hashedPassword: string): void {
    this.props.password = hashedPassword;
    this.props.updatedAt = new Date();
  }

  toJSON() {
    return {
      id: this.props.id,
      email: this.props.email,
      name: this.props.name,
      role: this.props.role,
      avatarUrl: this.props.avatarUrl,
      isAdmin: this.props.isAdmin,
      isVerified: this.props.isVerified,
      isActive: this.props.isActive,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
    };
  }
}
