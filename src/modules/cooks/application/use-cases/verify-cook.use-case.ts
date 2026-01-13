// ============================================================================
// src/modules/cooks/application/use-cases/verify-cook.use-case.ts
// ============================================================================
import { ICookRepository } from "../../domain/repositories/cook.repository";
import { CookVerificationService } from "../../domain/services/cook-verification.service";
import { NotFoundError } from "@core/errors";

export class VerifyCookUseCase {
  constructor(private readonly cookRepository: ICookRepository) {}

  async execute(cookId: string) {
    const cook = await this.cookRepository.findById(cookId);
    if (!cook) {
      throw new NotFoundError("Cook not found");
    }

    // Validate cook can be verified
    CookVerificationService.canVerify(cook);

    cook.verify();
    const updated = await this.cookRepository.save(cook);
    return updated.toJSON();
  }
}
