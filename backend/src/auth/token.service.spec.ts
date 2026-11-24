import { JwtService } from '@nestjs/jwt';
import { TokenService } from './token.service.js';

const SECRET = 'test-secret-not-for-real-use';

function createService(secret: string = SECRET): TokenService {
  const jwtService = new JwtService({
    secret,
    signOptions: { expiresIn: 3600 },
  });
  return new TokenService(jwtService);
}

describe('TokenService', () => {
  const service = createService();
  const payload = { sub: 'user-1', role: 'student' as const };

  it('creates a token with three parts', async () => {
    const token = await service.sign(payload);
    expect(token).toMatch(/^[\w-]+\.[\w-]+\.[\w-]+$/);
  });

  it('returns the user id and role from a valid token', async () => {
    const token = await service.sign(payload);
    const result = await service.verify(token);
    expect(result.sub).toBe('user-1');
    expect(result.role).toBe('student');
  });

  it('rejects a token whose role was changed', async () => {
    const token = await service.sign(payload);
    const [header, , signature] = token.split('.');
    const forgedPayload = Buffer.from(
      JSON.stringify({ sub: 'user-1', role: 'admin' }),
    ).toString('base64url');
    const forged = `${header}.${forgedPayload}.${signature}`;
    await expect(service.verify(forged)).rejects.toThrow();
  });

  it('rejects a token signed with a different secret', async () => {
    const other = createService('a-different-secret');
    const token = await other.sign(payload);
    await expect(service.verify(token)).rejects.toThrow();
  });

  it('rejects an expired token', async () => {
    const jwtService = new JwtService({ secret: SECRET });
    const expired = await jwtService.signAsync(payload, { expiresIn: -10 });
    await expect(service.verify(expired)).rejects.toThrow();
  });

  it('rejects text that is not a token', async () => {
    await expect(service.verify('not-a-token')).rejects.toThrow();
  });
});