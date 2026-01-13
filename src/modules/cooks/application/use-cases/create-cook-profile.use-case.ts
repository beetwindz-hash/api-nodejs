// ============================================================================
// src/modules/cooks/application/use-cases/create-cook-profile.use-case.ts
// ============================================================================
import { ICookRepository } from "../../domain/repositories/cook.repository";
import { IUserRepository } from "@modules/auth/domain/repositories/user.repository";
import { CookEntity } from "../../domain/entities/cook.entity";
import { PhoneNumber } from "../../domain/value-objects/phone-number.vo";
import { DeliveryRadius } from "../../domain/value-objects/delivery-radius.vo";
import { CookVerificationService } from "../../domain/services/cook-verification.service";
import { CreateCookDto } from "../dto/cook.dto";
import { ConflictError, NotFoundError, BadRequestError } from "@core/errors";

export class CreateCookProfileUseCase {
  constructor(
    private readonly cookRepository: ICookRepository,
    private readonly userRepository: IUserRepository
  ) {}

  async execute(userId: string, dto: CreateCookDto) {
    // Verify user exists and has cook role
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError("User not found");
    }

    if (user.role !== "cook") {
      throw new BadRequestError(
        "User must have cook role to create cook profile"
      );
    }

    // Check if cook profile already exists
    const existingCook = await this.cookRepository.exists(userId);
    if (existingCook) {
      throw new ConflictError("Cook profile already exists for this user");
    }

    // Validate phone number
    const phoneNumber = PhoneNumber.create(dto.phoneNumber);

    // Validate delivery radius
    const deliveryRadius = DeliveryRadius.create(dto.deliveryRadius);

    // Validate availability schedule
    CookVerificationService.validateAvailabilitySchedule(dto.availability);

    // Create location with coordinates if provided
    const location = {
      ...dto.location,
      coordinates:
        dto.location.latitude && dto.location.longitude
          ? {
              type: "Point" as const,
              coordinates: [dto.location.longitude, dto.location.latitude],
            }
          : undefined,
    };

    // Create cook entity
    const cook = CookEntity.create({
      userId,
      bio: dto.bio,
      cuisines: dto.cuisines,
      specialties: dto.specialties,
      yearsOfExperience: dto.yearsOfExperience,
      certifications: dto.certifications || [],
      businessName: dto.businessName,
      businessLicense: dto.businessLicense,
      phoneNumber: phoneNumber.getValue(),
      location,
      deliveryRadius: deliveryRadius.getValue(),
      deliveryFee: dto.deliveryFee,
      minimumOrder: dto.minimumOrder,
      availability: dto.availability,
      status: "pending",
    });

    const savedCook = await this.cookRepository.save(cook);
    return savedCook.toJSON();
  }
}
