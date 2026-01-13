// ============================================================================
// src/modules/cooks/domain/services/cook-verification.service.ts
// ============================================================================
import { CookEntity } from "../entities/cook.entity";
import { BusinessRuleViolationError } from "@core/errors";

export class CookVerificationService {
  static canVerify(cook: CookEntity): void {
    if (cook.isVerified) {
      throw new BusinessRuleViolationError("Cook is already verified");
    }

    if (!cook.businessName) {
      throw new BusinessRuleViolationError(
        "Business name is required for verification"
      );
    }

    if (!cook.phoneNumber) {
      throw new BusinessRuleViolationError(
        "Phone number is required for verification"
      );
    }

    if (cook.cuisines.length === 0) {
      throw new BusinessRuleViolationError(
        "At least one cuisine type is required for verification"
      );
    }

    if (!cook.location.address || !cook.location.city) {
      throw new BusinessRuleViolationError(
        "Complete location is required for verification"
      );
    }

    if (cook.availability.length === 0) {
      throw new BusinessRuleViolationError(
        "Availability schedule is required for verification"
      );
    }
  }

  static validateAvailabilitySchedule(availability: any[]): void {
    if (!Array.isArray(availability) || availability.length === 0) {
      throw new BusinessRuleViolationError(
        "At least one availability slot is required"
      );
    }

    for (const slot of availability) {
      if (!slot.day || !slot.startTime || !slot.endTime) {
        throw new BusinessRuleViolationError(
          "All availability slots must have day, start time, and end time"
        );
      }

      // Validate time format HH:MM
      const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
      if (!timeRegex.test(slot.startTime) || !timeRegex.test(slot.endTime)) {
        throw new BusinessRuleViolationError("Time must be in HH:MM format");
      }

      // Validate start time is before end time
      if (slot.startTime >= slot.endTime) {
        throw new BusinessRuleViolationError(
          "Start time must be before end time"
        );
      }
    }
  }
}
