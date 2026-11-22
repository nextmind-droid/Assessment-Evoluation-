import { AuthController } from './auth.controller.js';
import type { AuthService, LoginResult } from './auth.service.js';

describe('AuthController', () => {
  const result: LoginResult = {
    accessToken: 'token',
    tokenType: 'Bearer',
    expiresIn: 3600,
    user: { name: 'Demo', email: 'student@example.com', role: 'student' },
  };

  it('passes the login details to AuthService and returns its result', async () => {
    const login = vi.fn().mockResolvedValue(result);
    const controller = new AuthController({ login } as unknown as AuthService);

    const response = await controller.login({
      email: 'student@example.com',
      password: 'secret123',
      role: 'student',
    });

    expect(login).toHaveBeenCalledWith(
      'student@example.com',
      'secret123',
      'student',
    );
    expect(response).toEqual(result);
  });
});