// ============================================================================
// src/modules/cooks/application/use-cases/update-delivery-settings.use-case.ts
// ============================================================================
import { ICookRepository } from "../../domain/repositories/cook.repository";
import { DeliveryRadius } from "../../domain/value-objects/delivery-radius.vo";
import { UpdateDeliverySettingsDto } from "../dto/cook.dto";
import { NotFoundError, ForbiddenError } from "@core/errors";

export class UpdateDeliverySettingsUseCase {
  constructor(private readonly cookRepository: ICookRepository) {}

  async execute(userId: string, dto: UpdateDeliverySettingsDto) {
    const cook = await this.cookRepository.findByUserId(userId);
    if (!cook) {
      throw new NotFoundError("Cook profile not found");
    }

    if (cook.userId !== userId) {
      throw new ForbiddenError("Cannot update cook profile of another user");
    }

    // Validate delivery radius
    DeliveryRadius.create(dto.deliveryRadius);

    cook.updateDeliverySettings(
      dto.deliveryRadius,
      dto.deliveryFee,
      dto.minimumOrder
    );

    const updated = await this.cookRepository.save(cook);
    return updated.toJSON();
  }
}
