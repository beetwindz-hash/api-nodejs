// ============================================================================
// src/modules/users/application/use-cases/update-address.use-case.ts
// ============================================================================
import { IAddressRepository } from "../../domain/repositories/address.repository";
import { UpdateAddressDto } from "../dto/user.dto";
import { NotFoundError, ForbiddenError } from "@core/errors";

export class UpdateAddressUseCase {
  constructor(private readonly addressRepository: IAddressRepository) {}

  async execute(userId: string, addressId: string, dto: UpdateAddressDto) {
    const address = await this.addressRepository.findById(addressId);
    if (!address) {
      throw new NotFoundError("Address not found");
    }

    if (address.userId !== userId) {
      throw new ForbiddenError("Cannot update address of another user");
    }

    if (dto.isDefault) {
      await this.addressRepository.unsetAllDefaults(userId);
    }

    address.update(dto);
    const updated = await this.addressRepository.save(address);
    return updated.toJSON();
  }
}
