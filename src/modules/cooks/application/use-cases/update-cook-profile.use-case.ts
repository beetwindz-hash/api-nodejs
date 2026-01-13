// ============================================================================
// src/modules/cooks/application/use-cases/update-cook-profile.use-case.ts
// ============================================================================
import { ICookRepository } from "../../domain/repositories/cook.repository";
import { PhoneNumber } from "../../domain/value-objects/phone-number.vo";
import { UpdateCookProfileDto } from "../dto/cook.dto";
import { NotFoundError, ForbiddenError } from "@core/errors";

export class UpdateCookProfileUseCase {
  constructor(private readonly cookRepository: ICookRepository) {}

  async execute(userId: string, dto: UpdateCookProfileDto) {
    const cook = await this.cookRepository.findByUserId(userId);
    if (!cook) {
      throw new NotFoundError("Cook profile not found");
    }

    if (cook.userId !== userId) {
      throw new ForbiddenError("Cannot update cook profile of another user");
    }

    // Validate phone number if provided
    if (dto.phoneNumber) {
      PhoneNumber.create(dto.phoneNumber);
    }

    cook.updateProfile(dto);
    const updated = await this.cookRepository.save(cook);
    return updated.toJSON();
  }
}
