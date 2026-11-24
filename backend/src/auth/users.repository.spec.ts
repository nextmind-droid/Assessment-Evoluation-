import {
  InMemoryUsersRepository,
  type UserRecord,
} from './users.repository.js';

const student: UserRecord = {
  id: 'u1',
  name: 'Demo Student',
  email: 'student@example.com',
  passwordHash: 'not-a-real-hash',
  role: 'student',
};

describe('InMemoryUsersRepository', () => {
  const repository = new InMemoryUsersRepository([student]);

  it('finds a user by email', async () => {
    expect(await repository.findByEmail('student@example.com')).toEqual(
      student,
    );
  });

  it('ignores letter case and spaces around the email', async () => {
    expect(await repository.findByEmail('  Student@Example.COM ')).toEqual(
      student,
    );
  });

  it('returns null for an unknown email', async () => {
    expect(await repository.findByEmail('nobody@example.com')).toBeNull();
  });
});