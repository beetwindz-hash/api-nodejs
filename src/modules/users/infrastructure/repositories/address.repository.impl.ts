// ============================================================================
// src/modules/users/infrastructure/repositories/address.repository.impl.ts
// ============================================================================
import { IAddressRepository } from "../../domain/repositories/address.repository";
import { AddressEntity } from "../../domain/entities/address.entity";
import { AddressModel } from "../models/address.model";
import { AddressMapper } from "../mappers/address.mapper";
import mongoose from "mongoose";

export class AddressRepositoryImpl implements IAddressRepository {
  async findById(id: string): Promise<AddressEntity | null> {
    const address = await AddressModel.findById(id);
    return address ? AddressMapper.toDomain(address) : null;
  }

  async findByUserId(userId: string): Promise<AddressEntity[]> {
    const addresses = await AddressModel.find({
      userId: new mongoose.Types.ObjectId(userId),
    });
    return addresses.map(AddressMapper.toDomain);
  }

  async findDefaultByUserId(userId: string): Promise<AddressEntity | null> {
    const address = await AddressModel.findOne({
      userId: new mongoose.Types.ObjectId(userId),
      isDefault: true,
    });
    return address ? AddressMapper.toDomain(address) : null;
  }

  async save(address: AddressEntity): Promise<AddressEntity> {
    const persistenceData = AddressMapper.toPersistence(address);

    if (address.id) {
      const updated = await AddressModel.findByIdAndUpdate(
        address.id,
        persistenceData,
        { new: true }
      );
      return AddressMapper.toDomain(updated!);
    }

    const created = await AddressModel.create(persistenceData);
    return AddressMapper.toDomain(created);
  }

  async update(
    id: string,
    data: Partial<AddressEntity>
  ): Promise<AddressEntity> {
    const updated = await AddressModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    if (!updated) {
      throw new Error("Address not found");
    }
    return AddressMapper.toDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await AddressModel.findByIdAndDelete(id);
  }

  async unsetAllDefaults(userId: string): Promise<void> {
    await AddressModel.updateMany(
      { userId: new mongoose.Types.ObjectId(userId) },
      { isDefault: false }
    );
  }
}
