// ============================================================================
// src/modules/orders/domain/entities/order.entity.ts
// ============================================================================
import { OrderStatus } from "@core/types";

export type PaymentMethod = "cash" | "card" | "mobile_wallet";
export type PaymentStatus = "pending" | "completed" | "failed" | "refunded";

export interface OrderItemProps {
  dishId: string;
  dishName: string;
  quantity: number;
  price: number;
  specialInstructions?: string;
}

export interface DeliveryAddress {
  street: string;
  city: string;
  state?: string;
  postalCode?: string;
  country: string;
  phone: string;
  instructions?: string;
  latitude?: number;
  longitude?: number;
}

export interface OrderProps {
  id: string;
  orderNumber: string;
  customerId: string;
  cookId: string;
  items: OrderItemProps[];
  deliveryAddress: DeliveryAddress;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  tax: number;
  discount: number;
  total: number;
  estimatedPreparationTime: number; // in minutes
  estimatedDeliveryTime?: Date;
  actualDeliveryTime?: Date;
  notes?: string;
  cancelReason?: string;
  cancelledBy?: "customer" | "cook" | "admin";
  cancelledAt?: Date;
  confirmedAt?: Date;
  preparingAt?: Date;
  readyAt?: Date;
  deliveringAt?: Date;
  deliveredAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export class OrderEntity {
  private constructor(private props: OrderProps) {}

  static create(
    props: Omit<
      OrderProps,
      | "id"
      | "orderNumber"
      | "status"
      | "paymentStatus"
      | "createdAt"
      | "updatedAt"
    >
  ): OrderEntity {
    return new OrderEntity({
      ...props,
      id: "",
      orderNumber: OrderEntity.generateOrderNumber(),
      status: "pending",
      paymentStatus: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static fromPersistence(props: OrderProps): OrderEntity {
    return new OrderEntity(props);
  }

  private static generateOrderNumber(): string {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 7).toUpperCase();
    return `ORD-${timestamp}-${random}`;
  }

  // Getters
  get id(): string {
    return this.props.id;
  }

  get orderNumber(): string {
    return this.props.orderNumber;
  }

  get customerId(): string {
    return this.props.customerId;
  }

  get cookId(): string {
    return this.props.cookId;
  }

  get items(): OrderItemProps[] {
    return this.props.items;
  }

  get deliveryAddress(): DeliveryAddress {
    return this.props.deliveryAddress;
  }

  get status(): OrderStatus {
    return this.props.status;
  }

  get paymentMethod(): PaymentMethod {
    return this.props.paymentMethod;
  }

  get paymentStatus(): PaymentStatus {
    return this.props.paymentStatus;
  }

  get subtotal(): number {
    return this.props.subtotal;
  }

  get deliveryFee(): number {
    return this.props.deliveryFee;
  }

  get serviceFee(): number {
    return this.props.serviceFee;
  }

  get tax(): number {
    return this.props.tax;
  }

  get discount(): number {
    return this.props.discount;
  }

  get total(): number {
    return this.props.total;
  }

  get estimatedPreparationTime(): number {
    return this.props.estimatedPreparationTime;
  }

  get estimatedDeliveryTime(): Date | undefined {
    return this.props.estimatedDeliveryTime;
  }

  get actualDeliveryTime(): Date | undefined {
    return this.props.actualDeliveryTime;
  }

  get notes(): string | undefined {
    return this.props.notes;
  }

  get cancelReason(): string | undefined {
    return this.props.cancelReason;
  }

  get cancelledBy(): "customer" | "cook" | "admin" | undefined {
    return this.props.cancelledBy;
  }

  get cancelledAt(): Date | undefined {
    return this.props.cancelledAt;
  }

  get confirmedAt(): Date | undefined {
    return this.props.confirmedAt;
  }

  get preparingAt(): Date | undefined {
    return this.props.preparingAt;
  }

  get readyAt(): Date | undefined {
    return this.props.readyAt;
  }

  get deliveringAt(): Date | undefined {
    return this.props.deliveringAt;
  }

  get deliveredAt(): Date | undefined {
    return this.props.deliveredAt;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  // Business methods
  confirm(): void {
    if (this.props.status !== "pending") {
      throw new Error("Only pending orders can be confirmed");
    }
    this.props.status = "confirmed";
    this.props.confirmedAt = new Date();
    this.calculateEstimatedDeliveryTime();
    this.props.updatedAt = new Date();
  }

  startPreparing(): void {
    if (this.props.status !== "confirmed") {
      throw new Error("Only confirmed orders can be prepared");
    }
    this.props.status = "preparing";
    this.props.preparingAt = new Date();
    this.props.updatedAt = new Date();
  }

  markReady(): void {
    if (this.props.status !== "preparing") {
      throw new Error("Only preparing orders can be marked as ready");
    }
    this.props.status = "ready";
    this.props.readyAt = new Date();
    this.props.updatedAt = new Date();
  }

  startDelivering(): void {
    if (this.props.status !== "ready") {
      throw new Error("Only ready orders can be delivered");
    }
    this.props.status = "delivering";
    this.props.deliveringAt = new Date();
    this.props.updatedAt = new Date();
  }

  markDelivered(): void {
    if (this.props.status !== "delivering") {
      throw new Error("Only delivering orders can be marked as delivered");
    }
    this.props.status = "delivered";
    this.props.deliveredAt = new Date();
    this.props.actualDeliveryTime = new Date();
    this.props.updatedAt = new Date();
  }

  cancel(reason: string, cancelledBy: "customer" | "cook" | "admin"): void {
    if (this.props.status === "delivered") {
      throw new Error("Delivered orders cannot be cancelled");
    }
    if (this.props.status === "cancelled") {
      throw new Error("Order is already cancelled");
    }
    this.props.status = "cancelled";
    this.props.cancelReason = reason;
    this.props.cancelledBy = cancelledBy;
    this.props.cancelledAt = new Date();
    this.props.updatedAt = new Date();
  }

  markPaymentCompleted(): void {
    this.props.paymentStatus = "completed";
    this.props.updatedAt = new Date();
  }

  markPaymentFailed(): void {
    this.props.paymentStatus = "failed";
    this.props.updatedAt = new Date();
  }

  refund(): void {
    if (this.props.paymentStatus !== "completed") {
      throw new Error("Only completed payments can be refunded");
    }
    this.props.paymentStatus = "refunded";
    this.props.updatedAt = new Date();
  }

  updateEstimatedDeliveryTime(minutes: number): void {
    const estimatedTime = new Date();
    estimatedTime.setMinutes(estimatedTime.getMinutes() + minutes);
    this.props.estimatedDeliveryTime = estimatedTime;
    this.props.updatedAt = new Date();
  }

  private calculateEstimatedDeliveryTime(): void {
    const totalMinutes = this.props.estimatedPreparationTime + 30; // Add 30 mins for delivery
    this.updateEstimatedDeliveryTime(totalMinutes);
  }

  canBeCancelledByCustomer(): boolean {
    return ["pending", "confirmed"].includes(this.props.status);
  }

  canBeCancelledByCook(): boolean {
    return ["pending", "confirmed", "preparing"].includes(this.props.status);
  }

  isActive(): boolean {
    return !["delivered", "cancelled"].includes(this.props.status);
  }

  getTimeInCurrentStatus(): number {
    const statusTimestamps: Record<OrderStatus, Date | undefined> = {
      pending: this.props.createdAt,
      confirmed: this.props.confirmedAt,
      preparing: this.props.preparingAt,
      ready: this.props.readyAt,
      delivering: this.props.deliveringAt,
      delivered: this.props.deliveredAt,
      cancelled: this.props.cancelledAt,
    };

    const statusTime = statusTimestamps[this.props.status];
    if (!statusTime) return 0;

    return Math.floor((Date.now() - statusTime.getTime()) / 1000 / 60); // Minutes
  }

  getTotalItemCount(): number {
    return this.props.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  toJSON() {
    return {
      ...this.props,
      timeInCurrentStatus: this.getTimeInCurrentStatus(),
      totalItemCount: this.getTotalItemCount(),
      canCancelByCustomer: this.canBeCancelledByCustomer(),
      canCancelByCook: this.canBeCancelledByCook(),
      isActive: this.isActive(),
    };
  }
}
