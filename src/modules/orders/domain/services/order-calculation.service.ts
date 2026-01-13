// ============================================================================
// src/modules/orders/domain/services/order-calculation.service.ts
// ============================================================================
import { OrderItemProps } from "../entities/order.entity";
import { OrderAmount } from "../value-objects/order-amount.vo";

export interface OrderCalculationResult {
  subtotal: number;
  deliveryFee: number;
  serviceFee: number;
  tax: number;
  discount: number;
  total: number;
}

export class OrderCalculationService {
  private static readonly SERVICE_FEE_RATE = 0.1; // 10%
  private static readonly TAX_RATE = 0.19; // 19% VAT
  private static readonly FREE_DELIVERY_THRESHOLD = 3000; // DZD

  static calculateOrderTotal(
    items: OrderItemProps[],
    deliveryFeeBase: number,
    discountAmount: number = 0
  ): OrderCalculationResult {
    // Calculate subtotal
    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const subtotalAmount = OrderAmount.create(subtotal);

    // Calculate delivery fee (free if above threshold)
    const deliveryFee =
      subtotal >= this.FREE_DELIVERY_THRESHOLD ? 0 : deliveryFeeBase;
    const deliveryAmount = OrderAmount.create(deliveryFee);

    // Calculate service fee
    const serviceFee = subtotal * this.SERVICE_FEE_RATE;
    const serviceFeeAmount = OrderAmount.create(serviceFee);

    // Apply discount
    const discountAmount_vo = OrderAmount.create(discountAmount);

    // Calculate tax on (subtotal + service fee - discount)
    const taxableAmount = subtotal + serviceFee - discountAmount;
    const tax = taxableAmount * this.TAX_RATE;
    const taxAmount = OrderAmount.create(tax);

    // Calculate total
    const total = subtotal + deliveryFee + serviceFee + tax - discountAmount;
    const totalAmount = OrderAmount.create(total);

    return {
      subtotal: Math.round(subtotal * 100) / 100,
      deliveryFee: Math.round(deliveryFee * 100) / 100,
      serviceFee: Math.round(serviceFee * 100) / 100,
      tax: Math.round(tax * 100) / 100,
      discount: Math.round(discountAmount * 100) / 100,
      total: Math.round(total * 100) / 100,
    };
  }

  static calculateEstimatedPreparationTime(
    items: OrderItemProps[],
    preparationTimes: Map<string, number>
  ): number {
    // Get the longest preparation time among all dishes
    let maxTime = 0;
    for (const item of items) {
      const dishTime = preparationTimes.get(item.dishId) || 30; // Default 30 mins
      if (dishTime > maxTime) {
        maxTime = dishTime;
      }
    }

    // Add buffer time based on number of items
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const bufferTime = Math.min(itemCount * 5, 30); // Max 30 min buffer

    return maxTime + bufferTime;
  }

  static validateMinimumOrder(subtotal: number, minimumOrder: number): boolean {
    return subtotal >= minimumOrder;
  }
}
