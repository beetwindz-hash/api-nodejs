// ============================================================================
// src/modules/users/infrastructure/mappers/address.mapper.ts
// ============================================================================
import { AddressEntity } from "../../domain/entities/address.entity";
import { IAddressDocument } from "../models/address.model";

export class AddressMapper {
  static toDomain(document: IAddressDocument): AddressEntity {
    return AddressEntity.fromPersistence({
      id: document._id.toString(),
      userId: document.userId.toString(),
      label: document.label,
      street: document.street,
      city: document.city,
      state: document.state,
      postalCode: document.postalCode,
      country: document.country,
      isDefault: document.isDefault,
      phone: document.phone,
      instructions: document.instructions,
      latitude: document.latitude,
      longitude: document.longitude,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    });
  }

  static toPersistence(entity: AddressEntity): Partial<IAddressDocument> {
    const json = entity.toJSON();
    return {
      userId: json.userId as any,
      label: json.label,
      street: json.street,
      city: json.city,
      state: json.state,
      postalCode: json.postalCode,
      country: json.country,
      isDefault: json.isDefault,
      phone: json.phone,
      instructions: json.instructions,
      latitude: json.latitude,
      longitude: json.longitude,
    };
  }
}
