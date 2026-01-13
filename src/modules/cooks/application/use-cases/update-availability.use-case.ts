// ============================================================================
// src/modules/cooks/application/use-cases/update-availability.use-case.ts
// ============================================================================
import { ICookRepository } from "../../domain/repositories/cook.repository";
import { CookVerificationService } from "../../domain/services/cook-verification.service";
import { UpdateAvailabilityDto } from "../dto/cook.dto";
import { NotFoundError, ForbiddenError } from "@core/errors";

export class UpdateAvailabilityUseCase {
  constructor(private readonly cookRepository: ICookRepository) {}

  async execute(userId: string, dto: UpdateAvailabilityDto) {
    const cook = await this.cookRepository.findByUserId(userId);
    if (!cook) {
      throw new NotFoundError("Cook profile not found");
    }

    if (cook.userId !== userId) {
      throw new ForbiddenError("Cannot update cook profile of another user");
    }

    // Validate availability schedule
    CookVerificationService.validateAvailabilitySchedule(dto.availability);

    cook.updateAvailability(dto.availability);
    const updated = await this.cookRepository.save(cook);
    return updated.toJSON();
  }
}
