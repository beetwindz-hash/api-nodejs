// ============================================================================
// src/modules/auth/application/use-cases/register.use-case.ts
// ============================================================================
import { IUserRepository } from "../../domain/repositories/user.repository";
import { UserEntity } from "../../domain/entities/user.entity";
import { Email } from "../../domain/value-objects/email.vo";
import { Password } from "../../domain/value-objects/password.vo";
import { RegisterDto, AuthResponseDto } from "../dto/auth.dto";
import { JwtUtil, HashUtil } from "@core/utils";
import { ConflictError } from "@core/errors";

export class RegisterUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(dto: RegisterDto): Promise<AuthResponseDto> {
    const email = Email.create(dto.email);
    const password = Password.create(dto.password);

    const emailExists = await this.userRepository.exists(email.getValue());
    if (emailExists) {
      throw new ConflictError("Email already registered");
    }

    const hashedPassword = await HashUtil.hash(password.getValue());

    const user = UserEntity.create({
      email: email.getValue(),
      password: hashedPassword,
      name: dto.name,
      role: dto.role,
      isAdmin: false,
      isVerified: false,
      isActive: true,
    });

    const savedUser = await this.userRepository.save(user);

    const accessToken = JwtUtil.generateAccessToken({
      userId: savedUser.id,
      email: savedUser.email,
      role: savedUser.role,
    });

    const refreshToken = JwtUtil.generateRefreshToken({
      userId: savedUser.id,
      email: savedUser.email,
      role: savedUser.role,
    });

    const hashedRefreshToken = await HashUtil.hash(refreshToken);
    savedUser.updateRefreshToken(hashedRefreshToken);
    await this.userRepository.save(savedUser);

    return {
      user: savedUser.toJSON(),
      accessToken,
      refreshToken,
      expiresIn: 3600,
    };
  }
}
