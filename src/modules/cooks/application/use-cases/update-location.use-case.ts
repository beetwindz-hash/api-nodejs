// ============================================================================
// src/modules/cooks/application/use-cases/update-location.use-case.ts
// ============================================================================
import { ICookRepository } from "../../domain/repositories/cook.repository";
import { UpdateLocationDto } from "../dto/cook.dto";
import { NotFoundError, ForbiddenError } from "@core/errors";

export class UpdateLocationUseCase {
  constructor(private readonly cookRepository: ICookRepository) {}

  async execute(userId: string, dto: UpdateLocationDto) {
    const cook = await this.cookRepository.findByUserId(userId);
    if (!cook) {
      throw new NotFoundError("Cook profile not found");
    }

    if (cook.userId !== userId) {
      throw new ForbiddenError("Cannot update cook profile of another user");
    }

    const location = {
      ...dto,
      coordinates:
        dto.latitude && dto.longitude
          ? {
              type: "Point" as const,
              coordinates: [dto.longitude, dto.latitude],
            }
          : undefined,
    };

    cook.updateLocation(location);
    const updated = await this.cookRepository.save(cook);
    return updated.toJSON();
  }
}
