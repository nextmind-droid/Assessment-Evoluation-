import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { LoginDto } from './login.dto.js';

const validBody = {
  email: 'student@example.com',
  password: 'secret123',
  role: 'student',
};

async function failedFields(body: object): Promise<string[]> {
  const dto = plainToInstance(LoginDto, body);
  const errors = await validate(dto);
  return errors.map((error) => error.property).sort();
}

describe('LoginDto', () => {
  it('accepts a valid login body', async () => {
    expect(await failedFields(validBody)).toEqual([]);
  });

  it.each(['student', 'faculty', 'admin'])(
    'accepts the role %s',
    async (role) => {
      const body = { ...validBody, role };
      expect(await failedFields(body)).toEqual([]);
    },
  );

  it('rejects an invalid email', async () => {
    const body = { ...validBody, email: 'not-an-email' };
    expect(await failedFields(body)).toEqual(['email']);
  });

  it('rejects a missing email', async () => {
    const body = { ...validBody, email: undefined };
    expect(await failedFields(body)).toEqual(['email']);
  });

  it('rejects an empty password', async () => {
    const body = { ...validBody, password: '' };
    expect(await failedFields(body)).toEqual(['password']);
  });

  it('rejects a missing password', async () => {
    const body = { ...validBody, password: undefined };
    expect(await failedFields(body)).toEqual(['password']);
  });

  it('rejects a password that is not text', async () => {
    const body = { ...validBody, password: 12345 };
    expect(await failedFields(body)).toEqual(['password']);
  });

  it('rejects an unknown role', async () => {
    const body = { ...validBody, role: 'teacher' };
    expect(await failedFields(body)).toEqual(['role']);
  });

  it('rejects a missing role', async () => {
    const body = { ...validBody, role: undefined };
    expect(await failedFields(body)).toEqual(['role']);
  });

  it('rejects an empty body on all three fields', async () => {
    expect(await failedFields({})).toEqual(['email', 'password', 'role']);
  });
});