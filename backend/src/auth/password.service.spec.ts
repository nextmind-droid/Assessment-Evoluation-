import { PasswordService } from './password.service.js';

describe('PasswordService', () => {
  const service = new PasswordService();

  it('returns a salt and a key separated by a colon', async () => {
    const hash = await service.hash('secret123');
    expect(hash).toMatch(/^[0-9a-f]{32}:[0-9a-f]{128}$/);
  });

  it('does not contain the plain password', async () => {
    const hash = await service.hash('secret123');
    expect(hash).not.toContain('secret123');
  });

  it('gives a different hash each time for the same password', async () => {
    const first = await service.hash('secret123');
    const second = await service.hash('secret123');
    expect(first).not.toEqual(second);
  });

  it('verifies the correct password', async () => {
    const hash = await service.hash('secret123');
    expect(await service.verify('secret123', hash)).toBe(true);
  });

  it('rejects a wrong password', async () => {
    const hash = await service.hash('secret123');
    expect(await service.verify('wrong-password', hash)).toBe(false);
  });

  it.each(['', 'not-a-hash', 'abc:def', 'a:b:c'])(
    'rejects the malformed stored hash "%s"',
    async (storedHash) => {
      expect(await service.verify('secret123', storedHash)).toBe(false);
    },
  );
});