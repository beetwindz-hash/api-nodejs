// ============================================================================
// src/modules/users/domain/entities/user-profile.entity.ts
// ============================================================================
import { Address, Preferences } from "@core/types";

export interface UserProfileProps {
  id: string;
  userId: string;
  phone?: string;
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
      preferences: props.preferences || {
        language: "en",
        notifications: true,
        newsletter: false,
      },
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

  get phone(): string | undefined {
    return this.props.phone;
  }

  get address(): Address | undefined {
    return this.props.address;
  }

  get preferences(): Preferences {
    return this.props.preferences;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  updateProfile(
    data: Partial<Pick<UserProfileProps, "phone" | "address" | "preferences">>
  ): void {
    if (data.phone !== undefined) this.props.phone = data.phone;
    if (data.address) this.props.address = data.address;
    if (data.preferences)
      this.props.preferences = {
        ...this.props.preferences,
        ...data.preferences,
      };
    this.props.updatedAt = new Date();
  }

  toJSON() {
    return { ...this.props };
  }
}
