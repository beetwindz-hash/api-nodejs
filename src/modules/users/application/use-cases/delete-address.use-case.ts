// ============================================================================
// src/modules/users/application/use-cases/delete-address.use-case.ts
// ============================================================================
import { IAddressRepository } from "../../domain/repositories/address.repository";
import { NotFoundError, ForbiddenError } from "@core/errors";

export class DeleteAddressUseCase {
  constructor(private readonly addressRepository: IAddressRepository) {}

  async execute(userId: string, addressId: string): Promise<void> {
    const address = await this.addressRepository.findById(addressId);
    if (!address) {
      throw new NotFoundError("Address not found");
    }

    if (address.userId !== userId) {
      throw new ForbiddenError("Cannot delete address of another user");
    }

    await this.addressRepository.delete(addressId);
  }
}
