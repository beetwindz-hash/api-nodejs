// ============================================================================
// src/modules/auth/application/use-cases/login.use-case.ts
// ============================================================================
import { IUserRepository } from "../../domain/repositories/user.repository";
import { AuthDomainService } from "../../domain/services/auth.service";
import { LoginDto, AuthResponseDto } from "../dto/auth.dto";
import { JwtUtil, HashUtil } from "@core/utils";
import { UnauthorizedError } from "@core/errors";

export class LoginUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(dto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedError("Invalid credentials");
    }

    await AuthDomainService.validateCredentials(user, dto.password);

    const accessToken = JwtUtil.generateAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const refreshToken = JwtUtil.generateRefreshToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const hashedRefreshToken = await HashUtil.hash(refreshToken);
    user.updateRefreshToken(hashedRefreshToken);
    await this.userRepository.save(user);

    return {
      user: user.toJSON(),
      accessToken,
      refreshToken,
      expiresIn: 3600,
    };
  }
}
