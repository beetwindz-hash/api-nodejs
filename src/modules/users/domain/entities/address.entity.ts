// ============================================================================
// src/modules/users/domain/entities/address.entity.ts
// ============================================================================
export interface AddressProps {
  id: string;
  userId: string;
  label: string;
  street: string;
  city: string;
  state?: string;
  postalCode?: string;
  country: string;
  isDefault: boolean;
  phone?: string;
  instructions?: string;
  latitude?: number;
  longitude?: number;
  createdAt: Date;
  updatedAt: Date;
}

export class AddressEntity {
  private constructor(private props: AddressProps) {}

  static create(
    props: Omit<AddressProps, "id" | "createdAt" | "updatedAt">
  ): AddressEntity {
    return new AddressEntity({
      ...props,
      id: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static fromPersistence(props: AddressProps): AddressEntity {
    return new AddressEntity(props);
  }

  get id(): string {
    return this.props.id;
  }

  get userId(): string {
    return this.props.userId;
  }

  get isDefault(): boolean {
    return this.props.isDefault;
  }

  setAsDefault(): void {
    this.props.isDefault = true;
    this.props.updatedAt = new Date();
  }

  unsetDefault(): void {
    this.props.isDefault = false;
    this.props.updatedAt = new Date();
  }

  toJSON() {
    return { ...this.props };
  }
}
