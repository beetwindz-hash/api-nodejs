// ============================================================================
// src/modules/users/application/use-cases/set-default-address.use-case.ts
// ============================================================================
import { IAddressRepository } from "../../domain/repositories/address.repository";
import { NotFoundError, ForbiddenError } from "@core/errors";

export class SetDefaultAddressUseCase {
  constructor(private readonly addressRepository: IAddressRepository) {}

  async execute(userId: string, addressId: string) {
    const address = await this.addressRepository.findById(addressId);
    if (!address) {
      throw new NotFoundError("Address not found");
    }

    if (address.userId !== userId) {
      throw new ForbiddenError("Cannot modify address of another user");
    }

    await this.addressRepository.unsetAllDefaults(userId);
    address.setAsDefault();
    const updated = await this.addressRepository.save(address);
    return updated.toJSON();
  }
}
