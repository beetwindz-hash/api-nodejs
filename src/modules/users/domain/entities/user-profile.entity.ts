// src/modules/users/domain/entities/user-profile.entity.ts
import { Address, Preferences } from "@core/types";

export interface UserProfileProps {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  role: string;
  address?: Address;
  preferences: Preferences;
  createdAt: Date;
  updatedAt: Date;
}

export class UserProfileEntity {
  private constructor(private props: UserProfileProps) {}

  static create(
    props: Omit<UserProfileProps, "id" | "createdAt" | "updatedAt">
  ): UserProfileEntity {
    return new UserProfileEntity({
      ...props,
      id: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static fromPersistence(props: UserProfileProps): UserProfileEntity {
    return new UserProfileEntity(props);
  }

  get id(): string {
    return this.props.id;
  }

  get userId(): string {
    return this.props.userId;
  }

  updateProfile(
    data: Partial<
      Pick<UserProfileProps, "name" | "phone" | "address" | "preferences">
    >
  ): void {
    Object.assign(this.props, data);
    this.props.updatedAt = new Date();
  }

  updateAvatar(url: string): void {
    this.props.avatarUrl = url;
    this.props.updatedAt = new Date();
  }

  toJSON() {
    return { ...this.props };
  }
}
