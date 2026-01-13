// ============================================================================
// src/modules/orders/application/use-cases/create-order.use-case.ts
// ============================================================================
import { IOrderRepository } from "../../domain/repositories/order.repository";
import { IDishRepository } from "@modules/dishes/domain/repositories/dish.repository";
import { ICookRepository } from "@modules/cooks/domain/repositories/cook.repository";
import { IAddressRepository } from "@modules/users/domain/repositories/address.repository";
import {
  OrderEntity,
  OrderItemProps,
} from "../../domain/entities/order.entity";
import { OrderCalculationService } from "../../domain/services/order-calculation.service";
import { CreateOrderDto } from "../dto/order.dto";
import {
  NotFoundError,
  BadRequestError,
  BusinessRuleViolationError,
} from "@core/errors";

export class CreateOrderUseCase {
  constructor(
    private readonly orderRepository: IOrderRepository,
    private readonly dishRepository: IDishRepository,
    private readonly cookRepository: ICookRepository,
    private readonly addressRepository: IAddressRepository
  ) {}

  async execute(customerId: string, dto: CreateOrderDto) {
    // Validate cook exists and is active
    const cook = await this.cookRepository.findById(dto.cookId);
    if (!cook) {
      throw new NotFoundError("Cook not found");
    }

    if (!cook.isVerified || cook.status !== "active") {
      throw new BadRequestError("Cook is not available for orders");
    }

    // Validate delivery address
    const address = await this.addressRepository.findById(
      dto.deliveryAddressId
    );
    if (!address) {
      throw new NotFoundError("Delivery address not found");
    }

    if (address.userId !== customerId) {
      throw new BadRequestError("Invalid delivery address");
    }

    // Validate and fetch dishes
    const orderItems: OrderItemProps[] = [];
    const preparationTimes = new Map<string, number>();

    for (const item of dto.items) {
      const dish = await this.dishRepository.findById(item.dishId);
      if (!dish) {
        throw new NotFoundError(`Dish ${item.dishId} not found`);
      }

      if (dish.cookId !== dto.cookId) {
        throw new BadRequestError("All dishes must be from the same cook");
      }

      if (!dish.canAcceptOrders()) {
        throw new BusinessRuleViolationError(
          `Dish "${dish.name}" is not available for orders`
        );
      }

      if (item.quantity < 1 || item.quantity > 20) {
        throw new BadRequestError("Quantity must be between 1 and 20");
      }

      orderItems.push({
        dishId: dish.id,
        dishName: dish.name,
        quantity: item.quantity,
        price: dish.price,
        specialInstructions: item.specialInstructions,
      });

      preparationTimes.set(dish.id, dish.preparationTime);
    }

    // Calculate order totals
    const calculation = OrderCalculationService.calculateOrderTotal(
      orderItems,
      cook.deliveryFee,
      0 // No discount for now
    );

    // Validate minimum order
    if (
      !OrderCalculationService.validateMinimumOrder(
        calculation.subtotal,
        cook.minimumOrder
      )
    ) {
      throw new BusinessRuleViolationError(
        `Minimum order amount is ${cook.minimumOrder} DZD`
      );
    }

    // Calculate estimated preparation time
    const estimatedPreparationTime =
      OrderCalculationService.calculateEstimatedPreparationTime(
        orderItems,
        preparationTimes
      );

    // Create order
    const order = OrderEntity.create({
      customerId,
      cookId: dto.cookId,
      items: orderItems,
      deliveryAddress: {
        street: address.toJSON().street,
        city: address.toJSON().city,
        state: address.toJSON().state,
        postalCode: address.toJSON().postalCode,
        country: address.toJSON().country,
        phone: address.toJSON().phone || "",
        instructions: address.toJSON().instructions,
        latitude: address.toJSON().latitude,
        longitude: address.toJSON().longitude,
      },
      paymentMethod: dto.paymentMethod,
      subtotal: calculation.subtotal,
      deliveryFee: calculation.deliveryFee,
      serviceFee: calculation.serviceFee,
      tax: calculation.tax,
      discount: calculation.discount,
      total: calculation.total,
      estimatedPreparationTime,
      notes: dto.notes,
    });

    const savedOrder = await this.orderRepository.save(order);

    // TODO: Increment dish order counts
    // TODO: Send notification to cook
    // TODO: If payment method is card, initiate payment

    return savedOrder.toJSON();
  }
}
