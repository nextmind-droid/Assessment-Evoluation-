import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService, type LoginResult } from './auth.service.js';
import { LoginDto } from './dto/login.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  login(@Body() body: LoginDto): Promise<LoginResult> {
    return this.authService.login(body.email, body.password, body.role);
  }
}