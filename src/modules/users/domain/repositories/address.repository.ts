// ============================================================================
// src/modules/users/domain/repositories/address.repository.ts
// ============================================================================
import { AddressEntity } from "../entities/address.entity";

export interface IAddressRepository {
  findById(id: string): Promise<AddressEntity | null>;
  findByUserId(userId: string): Promise<AddressEntity[]>;
  findDefaultByUserId(userId: string): Promise<AddressEntity | null>;
  save(address: AddressEntity): Promise<AddressEntity>;
  update(id: string, data: Partial<AddressEntity>): Promise<AddressEntity>;
  delete(id: string): Promise<void>;
  unsetAllDefaults(userId: string): Promise<void>;
}
