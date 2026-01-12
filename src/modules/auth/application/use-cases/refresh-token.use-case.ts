// ============================================================================
// src/modules/auth/application/use-cases/refresh-token.use-case.ts
// ============================================================================
import { IUserRepository } from "../../domain/repositories/user.repository";
import { RefreshTokenDto } from "../dto/auth.dto";
import { JwtUtil, HashUtil } from "@core/utils";
import { UnauthorizedError } from "@core/errors";

export class RefreshTokenUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(dto: RefreshTokenDto): Promise<{
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  }> {
    const payload = JwtUtil.verifyRefreshToken(dto.refreshToken);

    const user = await this.userRepository.findById(payload.userId);
    if (!user || !user.refreshToken) {
      throw new UnauthorizedError("Invalid refresh token");
    }

    const isValidRefreshToken = await HashUtil.compare(
      dto.refreshToken,
      user.refreshToken
    );

    if (!isValidRefreshToken) {
      throw new UnauthorizedError("Invalid refresh token");
    }

    const accessToken = JwtUtil.generateAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const newRefreshToken = JwtUtil.generateRefreshToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const hashedRefreshToken = await HashUtil.hash(newRefreshToken);
    user.updateRefreshToken(hashedRefreshToken);
    await this.userRepository.save(user);

    return {
      accessToken,
      refreshToken: newRefreshToken,
      expiresIn: 3600,
    };
  }
}
