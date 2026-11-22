import { createDemoUsersRepository } from './demo-users.js';
import { PasswordService } from './password.service.js';

describe('createDemoUsersRepository', () => {
  const passwordService = new PasswordService();
  const password = 'demo-password-123';

  it('creates no users when DEMO_USER_PASSWORD is not set', async () => {
    const repository = await createDemoUsersRepository(passwordService, {});
    expect(await repository.findByEmail('student@example.com')).toBeNull();
  });

  it.each([
    ['student@example.com', 'student'],
    ['faculty@example.com', 'faculty'],
    ['admin@example.com', 'admin'],
  ])('creates the demo account %s with role %s', async (email, role) => {
    const repository = await createDemoUsersRepository(passwordService, {
      DEMO_USER_PASSWORD: password,
    });
    const user = await repository.findByEmail(email);
    expect(user?.role).toBe(role);
    expect(
      await passwordService.verify(password, user?.passwordHash ?? ''),
    ).toBe(true);
  });

  it('keeps only a hash and never the plain password', async () => {
    const repository = await createDemoUsersRepository(passwordService, {
      DEMO_USER_PASSWORD: password,
    });
    const user = await repository.findByEmail('student@example.com');
    expect(user?.passwordHash).not.toContain(password);
  });

  it('throws when the demo password is too short', async () => {
    await expect(
      createDemoUsersRepository(passwordService, {
        DEMO_USER_PASSWORD: 'short',
      }),
    ).rejects.toThrow('DEMO_USER_PASSWORD');
  });
});