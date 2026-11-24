import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service.js';
import { PasswordService } from './password.service.js';
import { TokenService } from './token.service.js';
import { InMemoryUsersRepository } from './users.repository.js';

const EMAIL = 'student@example.com';
const PASSWORD = 'secret123';

async function expectRejected(attempt: Promise<unknown>): Promise<void> {
  await expect(attempt).rejects.toBeInstanceOf(UnauthorizedException);
  await expect(attempt).rejects.toThrow('Invalid credentials');
}

describe('AuthService', () => {
  const passwordService = new PasswordService();
  const tokenService = new TokenService(
    new JwtService({
      secret: 'test-secret-not-for-real-use',
      signOptions: { expiresIn: 3600 },
    }),
  );
  let authService: AuthService;

  beforeAll(async () => {
    const repository = new InMemoryUsersRepository([
      {
        id: 'u1',
        name: 'Demo Student',
        email: EMAIL,
        passwordHash: await passwordService.hash(PASSWORD),
        role: 'student',
      },
    ]);
    authService = new AuthService(repository, passwordService, tokenService);
  });

  it('returns a token and the user details for a correct login', async () => {
    const result = await authService.login(EMAIL, PASSWORD, 'student');
    expect(result.tokenType).toBe('Bearer');
    expect(result.expiresIn).toBe(3600);
    expect(result.accessToken).toMatch(/^[\w-]+\.[\w-]+\.[\w-]+$/);
    expect(result.user).toEqual({
      name: 'Demo Student',
      email: EMAIL,
      role: 'student',
    });
  });

  it('puts the user id and real role inside the token', async () => {
    const result = await authService.login(EMAIL, PASSWORD, 'student');
    const payload = await tokenService.verify(result.accessToken);
    expect(payload.sub).toBe('u1');
    expect(payload.role).toBe('student');
  });

  it('accepts the email in a different letter case', async () => {
    const result = await authService.login(
      'STUDENT@Example.com',
      PASSWORD,
      'student',
    );
    expect(result.user.email).toBe(EMAIL);
  });

  it('rejects a wrong password', async () => {
    await expectRejected(authService.login(EMAIL, 'wrong-password', 'student'));
  });

  it('rejects an unknown email', async () => {
    await expectRejected(
      authService.login('nobody@example.com', PASSWORD, 'student'),
    );
  });

  it('rejects a role that does not match the real role', async () => {
    await expectRejected(authService.login(EMAIL, PASSWORD, 'admin'));
  });
});