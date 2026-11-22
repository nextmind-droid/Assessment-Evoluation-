import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller.js';
import { AuthService, TOKEN_LIFETIME_SECONDS } from './auth.service.js';
import { createDemoUsersRepository } from './demo-users.js';
import { getJwtSecret } from './jwt-secret.js';
import { PasswordService } from './password.service.js';
import { TokenService } from './token.service.js';
import { UsersRepository } from './users.repository.js';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: getJwtSecret(),
        signOptions: { expiresIn: TOKEN_LIFETIME_SECONDS },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    PasswordService,
    TokenService,
    AuthService,
    {
      provide: UsersRepository,
      useFactory: (passwordService: PasswordService) =>
        createDemoUsersRepository(passwordService),
      inject: [PasswordService],
    },
  ],
})
export class AuthModule {}