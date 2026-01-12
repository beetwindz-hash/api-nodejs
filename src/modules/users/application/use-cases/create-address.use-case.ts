// ============================================================================
// src/modules/users/application/use-cases/create-address.use-case.ts
// ============================================================================
import { IAddressRepository } from "../../domain/repositories/address.repository";
import { AddressEntity } from "../../domain/entities/address.entity";
import { CreateAddressDto } from "../dto/user.dto";

export class CreateAddressUseCase {
  constructor(private readonly addressRepository: IAddressRepository) {}

  async execute(userId: string, dto: CreateAddressDto) {
    if (dto.isDefault) {
      await this.addressRepository.unsetAllDefaults(userId);
    }

    const address = AddressEntity.create({
      userId,
      ...dto,
      isDefault: dto.isDefault || false,
    });

    const saved = await this.addressRepository.save(address);
    return saved.toJSON();
  }
}
