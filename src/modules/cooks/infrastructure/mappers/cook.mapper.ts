// ============================================================================
// src/modules/cooks/infrastructure/mappers/cook.mapper.ts
// ============================================================================
import { CookEntity } from "../../domain/entities/cook.entity";
import { ICookDocument } from "../models/cook.model";

export class CookMapper {
  static toDomain(document: ICookDocument): CookEntity {
    return CookEntity.fromPersistence({
      id: document._id.toString(),
      userId: document.userId.toString(),
      bio: document.bio,
      cuisines: document.cuisines,
      specialties: document.specialties,
      yearsOfExperience: document.yearsOfExperience,
      certifications: document.certifications,
      businessName: document.businessName,
      businessLicense: document.businessLicense,
      phoneNumber: document.phoneNumber,
      location: document.location,
      deliveryRadius: document.deliveryRadius,
      deliveryFee: document.deliveryFee,
      minimumOrder: document.minimumOrder,
      availability: document.availability,
      status: document.status,
      rating: document.rating,
      totalReviews: document.totalReviews,
      totalOrders: document.totalOrders,
      isVerified: document.isVerified,
      verifiedAt: document.verifiedAt,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    });
  }

  static toPersistence(entity: CookEntity): Partial<ICookDocument> {
    const json = entity.toJSON();
    return {
      userId: json.userId as any,
      bio: json.bio,
      cuisines: json.cuisines,
      specialties: json.specialties,
      yearsOfExperience: json.yearsOfExperience,
      certifications: json.certifications,
      businessName: json.businessName,
      businessLicense: json.businessLicense,
      phoneNumber: json.phoneNumber,
      location: json.location,
      deliveryRadius: json.deliveryRadius,
      deliveryFee: json.deliveryFee,
      minimumOrder: json.minimumOrder,
      availability: json.availability,
      status: json.status,
      rating: json.rating,
      totalReviews: json.totalReviews,
      totalOrders: json.totalOrders,
      isVerified: json.isVerified,
      verifiedAt: json.verifiedAt,
    };
  }
}
