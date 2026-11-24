import { Injectable, UnauthorizedException } from '@nestjs/common';
import type { LoginRole } from './dto/login.dto.js';
import { PasswordService } from './password.service.js';
import { TokenService } from './token.service.js';
import { UsersRepository } from './users.repository.js';

export const TOKEN_LIFETIME_SECONDS = 3600;

export interface LoginResult {
  accessToken: string;
  tokenType: 'Bearer';
  expiresIn: number;
  user: { name: string; email: string; role: LoginRole };
}

@Injectable()
export class AuthService {
  private dummyHash?: Promise<string>;

  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly passwordService: PasswordService,
    private readonly tokenService: TokenService,
  ) {}

  async login(
    email: string,
    password: string,
    role: LoginRole,
  ): Promise<LoginResult> {
    const user = await this.usersRepository.findByEmail(email);
    const hashToCheck = user ? user.passwordHash : await this.getDummyHash();
    const passwordMatches = await this.passwordService.verify(
      password,
      hashToCheck,
    );

    if (!user || !passwordMatches || user.role !== role) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = await this.tokenService.sign({
      sub: user.id,
      role: user.role,
    });

    return {
      accessToken,
      tokenType: 'Bearer',
      expiresIn: TOKEN_LIFETIME_SECONDS,
      user: { name: user.name, email: user.email, role: user.role },
    };
  }

  private getDummyHash(): Promise<string> {
    this.dummyHash ??= this.passwordService.hash('not-a-real-password');
    return this.dummyHash;
  }
}