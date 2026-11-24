import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { LoginRole } from './dto/login.dto.js';

export interface TokenPayload {
  sub: string;
  role: LoginRole;
}

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  sign(payload: TokenPayload): Promise<string> {
    return this.jwtService.signAsync(payload);
  }

  verify(token: string): Promise<TokenPayload> {
    return this.jwtService.verifyAsync<TokenPayload>(token);
  }
}