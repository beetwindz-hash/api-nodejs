// ============================================================================
// src/modules/users/application/use-cases/get-addresses.use-case.ts
// ============================================================================
import { IAddressRepository } from "../../domain/repositories/address.repository";

export class GetAddressesUseCase {
  constructor(private readonly addressRepository: IAddressRepository) {}

  async execute(userId: string) {
    const addresses = await this.addressRepository.findByUserId(userId);
    return addresses.map((address) => address.toJSON());
  }
}
