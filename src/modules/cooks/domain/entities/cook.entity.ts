// ============================================================================
// src/modules/cooks/domain/entities/cook.entity.ts
// ============================================================================
import { Location } from "@core/types";

export type CookStatus = "pending" | "active" | "suspended" | "inactive";
export type CuisineType =
  | "algerian"
  | "french"
  | "italian"
  | "mediterranean"
  | "international"
  | "other";
export type DayOfWeek =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export interface AvailabilitySlot {
  day: DayOfWeek;
  startTime: string; // Format: "HH:MM"
  endTime: string; // Format: "HH:MM"
  isAvailable: boolean;
}

export interface CookProps {
  id: string;
  userId: string;
  bio?: string;
  cuisines: CuisineType[];
  specialties: string[];
  yearsOfExperience: number;
  certifications: string[];
  businessName?: string;
  businessLicense?: string;
  phoneNumber: string;
  location: {
    address: string;
    city: string;
    state?: string;
    postalCode?: string;
    country: string;
    coordinates?: Location;
  };
  deliveryRadius: number; // in kilometers
  deliveryFee: number;
  minimumOrder: number;
  availability: AvailabilitySlot[];
  status: CookStatus;
  rating: number;
  totalReviews: number;
  totalOrders: number;
  isVerified: boolean;
  verifiedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export class CookEntity {
  private constructor(private props: CookProps) {}

  static create(
    props: Omit<
      CookProps,
      | "id"
      | "rating"
      | "totalReviews"
      | "totalOrders"
      | "isVerified"
      | "createdAt"
      | "updatedAt"
    >
  ): CookEntity {
    return new CookEntity({
      ...props,
      id: "",
      rating: 0,
      totalReviews: 0,
      totalOrders: 0,
      isVerified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static fromPersistence(props: CookProps): CookEntity {
    return new CookEntity(props);
  }

  // Getters
  get id(): string {
    return this.props.id;
  }

  get userId(): string {
    return this.props.userId;
  }

  get bio(): string | undefined {
    return this.props.bio;
  }

  get cuisines(): CuisineType[] {
    return this.props.cuisines;
  }

  get specialties(): string[] {
    return this.props.specialties;
  }

  get yearsOfExperience(): number {
    return this.props.yearsOfExperience;
  }

  get certifications(): string[] {
    return this.props.certifications;
  }

  get businessName(): string | undefined {
    return this.props.businessName;
  }

  get businessLicense(): string | undefined {
    return this.props.businessLicense;
  }

  get phoneNumber(): string {
    return this.props.phoneNumber;
  }

  get location(): CookProps["location"] {
    return this.props.location;
  }

  get deliveryRadius(): number {
    return this.props.deliveryRadius;
  }

  get deliveryFee(): number {
    return this.props.deliveryFee;
  }

  get minimumOrder(): number {
    return this.props.minimumOrder;
  }

  get availability(): AvailabilitySlot[] {
    return this.props.availability;
  }

  get status(): CookStatus {
    return this.props.status;
  }

  get rating(): number {
    return this.props.rating;
  }

  get totalReviews(): number {
    return this.props.totalReviews;
  }

  get totalOrders(): number {
    return this.props.totalOrders;
  }

  get isVerified(): boolean {
    return this.props.isVerified;
  }

  get verifiedAt(): Date | undefined {
    return this.props.verifiedAt;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  // Business methods
  updateProfile(
    data: Partial<
      Pick<
        CookProps,
        | "bio"
        | "cuisines"
        | "specialties"
        | "yearsOfExperience"
        | "businessName"
        | "phoneNumber"
      >
    >
  ): void {
    Object.assign(this.props, data);
    this.props.updatedAt = new Date();
  }

  updateLocation(location: CookProps["location"]): void {
    this.props.location = location;
    this.props.updatedAt = new Date();
  }

  updateDeliverySettings(
    radius: number,
    fee: number,
    minimumOrder: number
  ): void {
    if (radius <= 0) {
      throw new Error("Delivery radius must be greater than 0");
    }
    if (fee < 0) {
      throw new Error("Delivery fee cannot be negative");
    }
    if (minimumOrder < 0) {
      throw new Error("Minimum order cannot be negative");
    }

    this.props.deliveryRadius = radius;
    this.props.deliveryFee = fee;
    this.props.minimumOrder = minimumOrder;
    this.props.updatedAt = new Date();
  }

  updateAvailability(availability: AvailabilitySlot[]): void {
    this.props.availability = availability;
    this.props.updatedAt = new Date();
  }

  addCertification(certification: string): void {
    if (!this.props.certifications.includes(certification)) {
      this.props.certifications.push(certification);
      this.props.updatedAt = new Date();
    }
  }

  removeCertification(certification: string): void {
    this.props.certifications = this.props.certifications.filter(
      (c) => c !== certification
    );
    this.props.updatedAt = new Date();
  }

  activate(): void {
    this.props.status = "active";
    this.props.updatedAt = new Date();
  }

  suspend(): void {
    this.props.status = "suspended";
    this.props.updatedAt = new Date();
  }

  deactivate(): void {
    this.props.status = "inactive";
    this.props.updatedAt = new Date();
  }

  verify(): void {
    this.props.isVerified = true;
    this.props.verifiedAt = new Date();
    this.props.status = "active";
    this.props.updatedAt = new Date();
  }

  updateRating(newRating: number, incrementReviews: boolean = true): void {
    const totalRating = this.props.rating * this.props.totalReviews;
    this.props.totalReviews += incrementReviews ? 1 : 0;
    this.props.rating = (totalRating + newRating) / this.props.totalReviews;
    this.props.updatedAt = new Date();
  }

  incrementOrders(): void {
    this.props.totalOrders += 1;
    this.props.updatedAt = new Date();
  }

  isAvailableOnDay(day: DayOfWeek): boolean {
    return this.props.availability.some(
      (slot) => slot.day === day && slot.isAvailable
    );
  }

  isAvailableNow(): boolean {
    const now = new Date();
    const currentDay = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ][now.getDay()] as DayOfWeek;
    const currentTime = `${now.getHours().toString().padStart(2, "0")}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    return this.props.availability.some((slot) => {
      if (slot.day !== currentDay || !slot.isAvailable) return false;
      return currentTime >= slot.startTime && currentTime <= slot.endTime;
    });
  }

  toJSON() {
    return {
      id: this.props.id,
      userId: this.props.userId,
      bio: this.props.bio,
      cuisines: this.props.cuisines,
      specialties: this.props.specialties,
      yearsOfExperience: this.props.yearsOfExperience,
      certifications: this.props.certifications,
      businessName: this.props.businessName,
      businessLicense: this.props.businessLicense,
      phoneNumber: this.props.phoneNumber,
      location: this.props.location,
      deliveryRadius: this.props.deliveryRadius,
      deliveryFee: this.props.deliveryFee,
      minimumOrder: this.props.minimumOrder,
      availability: this.props.availability,
      status: this.props.status,
      rating: this.props.rating,
      totalReviews: this.props.totalReviews,
      totalOrders: this.props.totalOrders,
      isVerified: this.props.isVerified,
      verifiedAt: this.props.verifiedAt,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
    };
  }
}
