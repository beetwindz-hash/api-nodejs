// ============================================================================
// src/modules/dishes/domain/entities/dish.entity.ts
// ============================================================================
import { CuisineType } from "@modules/cooks/domain/entities/cook.entity";

export type DishCategory =
  | "appetizer"
  | "main_course"
  | "dessert"
  | "beverage"
  | "snack"
  | "side_dish";
export type DishStatus = "draft" | "active" | "inactive" | "out_of_stock";
export type SpiceLevel = "none" | "mild" | "medium" | "hot" | "very_hot";
export type PortionSize = "small" | "medium" | "large" | "family";

export interface DietaryInfo {
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  isDairyFree: boolean;
  isNutFree: boolean;
  isHalal: boolean;
  allergens: string[];
  calories?: number;
}

export interface NutritionalInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  sugar?: number;
  sodium?: number;
}

export interface DishProps {
  id: string;
  cookId: string;
  name: string;
  description: string;
  category: DishCategory;
  cuisine: CuisineType;
  price: number;
  originalPrice?: number; // For discounts
  preparationTime: number; // in minutes
  servings: number;
  portionSize: PortionSize;
  spiceLevel: SpiceLevel;
  images: string[];
  ingredients: string[];
  dietaryInfo: DietaryInfo;
  nutritionalInfo?: NutritionalInfo;
  tags: string[];
  isAvailable: boolean;
  status: DishStatus;
  maxOrdersPerDay?: number;
  currentOrdersToday: number;
  rating: number;
  totalReviews: number;
  totalOrders: number;
  viewCount: number;
  featured: boolean;
  featuredUntil?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export class DishEntity {
  private constructor(private props: DishProps) {}

  static create(
    props: Omit<
      DishProps,
      | "id"
      | "currentOrdersToday"
      | "rating"
      | "totalReviews"
      | "totalOrders"
      | "viewCount"
      | "featured"
      | "createdAt"
      | "updatedAt"
    >
  ): DishEntity {
    return new DishEntity({
      ...props,
      id: "",
      currentOrdersToday: 0,
      rating: 0,
      totalReviews: 0,
      totalOrders: 0,
      viewCount: 0,
      featured: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static fromPersistence(props: DishProps): DishEntity {
    return new DishEntity(props);
  }

  // Getters
  get id(): string {
    return this.props.id;
  }

  get cookId(): string {
    return this.props.cookId;
  }

  get name(): string {
    return this.props.name;
  }

  get description(): string {
    return this.props.description;
  }

  get category(): DishCategory {
    return this.props.category;
  }

  get cuisine(): CuisineType {
    return this.props.cuisine;
  }

  get price(): number {
    return this.props.price;
  }

  get originalPrice(): number | undefined {
    return this.props.originalPrice;
  }

  get preparationTime(): number {
    return this.props.preparationTime;
  }

  get servings(): number {
    return this.props.servings;
  }

  get portionSize(): PortionSize {
    return this.props.portionSize;
  }

  get spiceLevel(): SpiceLevel {
    return this.props.spiceLevel;
  }

  get images(): string[] {
    return this.props.images;
  }

  get ingredients(): string[] {
    return this.props.ingredients;
  }

  get dietaryInfo(): DietaryInfo {
    return this.props.dietaryInfo;
  }

  get nutritionalInfo(): NutritionalInfo | undefined {
    return this.props.nutritionalInfo;
  }

  get tags(): string[] {
    return this.props.tags;
  }

  get isAvailable(): boolean {
    return this.props.isAvailable;
  }

  get status(): DishStatus {
    return this.props.status;
  }

  get maxOrdersPerDay(): number | undefined {
    return this.props.maxOrdersPerDay;
  }

  get currentOrdersToday(): number {
    return this.props.currentOrdersToday;
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

  get viewCount(): number {
    return this.props.viewCount;
  }

  get featured(): boolean {
    return this.props.featured;
  }

  get featuredUntil(): Date | undefined {
    return this.props.featuredUntil;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  // Business methods
  updateDetails(
    data: Partial<
      Pick<
        DishProps,
        | "name"
        | "description"
        | "category"
        | "cuisine"
        | "preparationTime"
        | "servings"
        | "portionSize"
        | "spiceLevel"
      >
    >
  ): void {
    Object.assign(this.props, data);
    this.props.updatedAt = new Date();
  }

  updatePrice(price: number, originalPrice?: number): void {
    if (price <= 0) {
      throw new Error("Price must be greater than 0");
    }
    if (originalPrice && originalPrice < price) {
      throw new Error(
        "Original price must be greater than or equal to current price"
      );
    }
    this.props.price = price;
    this.props.originalPrice = originalPrice;
    this.props.updatedAt = new Date();
  }

  addImage(imageUrl: string): void {
    if (this.props.images.length >= 5) {
      throw new Error("Maximum 5 images allowed per dish");
    }
    this.props.images.push(imageUrl);
    this.props.updatedAt = new Date();
  }

  removeImage(imageUrl: string): void {
    this.props.images = this.props.images.filter((img) => img !== imageUrl);
    this.props.updatedAt = new Date();
  }

  updateIngredients(ingredients: string[]): void {
    this.props.ingredients = ingredients;
    this.props.updatedAt = new Date();
  }

  updateDietaryInfo(info: Partial<DietaryInfo>): void {
    this.props.dietaryInfo = { ...this.props.dietaryInfo, ...info };
    this.props.updatedAt = new Date();
  }

  updateNutritionalInfo(info: NutritionalInfo): void {
    this.props.nutritionalInfo = info;
    this.props.updatedAt = new Date();
  }

  addTag(tag: string): void {
    if (!this.props.tags.includes(tag)) {
      this.props.tags.push(tag);
      this.props.updatedAt = new Date();
    }
  }

  removeTag(tag: string): void {
    this.props.tags = this.props.tags.filter((t) => t !== tag);
    this.props.updatedAt = new Date();
  }

  activate(): void {
    this.props.status = "active";
    this.props.isAvailable = true;
    this.props.updatedAt = new Date();
  }

  deactivate(): void {
    this.props.status = "inactive";
    this.props.isAvailable = false;
    this.props.updatedAt = new Date();
  }

  markOutOfStock(): void {
    this.props.status = "out_of_stock";
    this.props.isAvailable = false;
    this.props.updatedAt = new Date();
  }

  markInStock(): void {
    this.props.status = "active";
    this.props.isAvailable = true;
    this.props.updatedAt = new Date();
  }

  setAvailability(available: boolean): void {
    this.props.isAvailable = available;
    this.props.updatedAt = new Date();
  }

  setMaxOrdersPerDay(max: number): void {
    if (max < 0) {
      throw new Error("Max orders per day cannot be negative");
    }
    this.props.maxOrdersPerDay = max;
    this.props.updatedAt = new Date();
  }

  incrementOrderCount(): void {
    this.props.currentOrdersToday += 1;
    this.props.totalOrders += 1;
    this.props.updatedAt = new Date();
  }

  resetDailyOrderCount(): void {
    this.props.currentOrdersToday = 0;
    this.props.updatedAt = new Date();
  }

  incrementViewCount(): void {
    this.props.viewCount += 1;
  }

  updateRating(newRating: number, incrementReviews: boolean = true): void {
    const totalRating = this.props.rating * this.props.totalReviews;
    this.props.totalReviews += incrementReviews ? 1 : 0;
    this.props.rating = (totalRating + newRating) / this.props.totalReviews;
    this.props.updatedAt = new Date();
  }

  setFeatured(until?: Date): void {
    this.props.featured = true;
    this.props.featuredUntil = until;
    this.props.updatedAt = new Date();
  }

  unsetFeatured(): void {
    this.props.featured = false;
    this.props.featuredUntil = undefined;
    this.props.updatedAt = new Date();
  }

  canAcceptOrders(): boolean {
    if (!this.props.isAvailable || this.props.status !== "active") {
      return false;
    }
    if (
      this.props.maxOrdersPerDay &&
      this.props.currentOrdersToday >= this.props.maxOrdersPerDay
    ) {
      return false;
    }
    return true;
  }

  hasDiscount(): boolean {
    return (
      !!this.props.originalPrice && this.props.originalPrice > this.props.price
    );
  }

  getDiscountPercentage(): number {
    if (!this.hasDiscount() || !this.props.originalPrice) {
      return 0;
    }
    return Math.round(
      ((this.props.originalPrice - this.props.price) /
        this.props.originalPrice) *
        100
    );
  }

  toJSON() {
    return {
      ...this.props,
      discountPercentage: this.getDiscountPercentage(),
      canOrder: this.canAcceptOrders(),
    };
  }
}
