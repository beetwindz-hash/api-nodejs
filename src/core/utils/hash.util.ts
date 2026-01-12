// ============================================================================
// src/core/utils/hash.util.ts
// ============================================================================
import bcrypt from "bcryptjs";

export class HashUtil {
  private static readonly SALT_ROUNDS = 12;

  static async hash(value: string): Promise<string> {
    return bcrypt.hash(value, this.SALT_ROUNDS);
  }

  static async compare(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash);
  }

  static async verify(value: string, hash: string): Promise<void> {
    const isValid = await this.compare(value, hash);
    if (!isValid) {
      throw new Error("Invalid credentials");
    }
  }
}
