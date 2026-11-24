import { getJwtSecret, MIN_JWT_SECRET_LENGTH } from './jwt-secret.js';

describe('getJwtSecret', () => {
  it('returns a secret that is long enough', () => {
    const secret = 'x'.repeat(MIN_JWT_SECRET_LENGTH);
    expect(getJwtSecret({ JWT_SECRET: secret })).toBe(secret);
  });

  it('throws when the secret is missing', () => {
    expect(() => getJwtSecret({})).toThrow('JWT_SECRET');
  });

  it('throws when the secret is empty', () => {
    expect(() => getJwtSecret({ JWT_SECRET: '' })).toThrow('JWT_SECRET');
  });

  it('throws when the secret is too short', () => {
    expect(() => getJwtSecret({ JWT_SECRET: 'short' })).toThrow('JWT_SECRET');
  });
});