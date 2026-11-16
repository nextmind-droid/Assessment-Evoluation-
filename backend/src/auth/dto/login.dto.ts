import { IsEmail, IsIn, IsNotEmpty, IsString } from 'class-validator';

export const LOGIN_ROLES = ['student', 'faculty', 'admin'] as const;

export type LoginRole = (typeof LOGIN_ROLES)[number];

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsIn(LOGIN_ROLES)
  role: LoginRole;
}