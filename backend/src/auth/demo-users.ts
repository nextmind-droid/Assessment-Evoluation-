import type { PasswordService } from './password.service.js';
import {
  InMemoryUsersRepository,
  type UserRecord,
  type UsersRepository,
} from './users.repository.js';

export const MIN_DEMO_PASSWORD_LENGTH = 8;

// Temporary accounts for development and frontend testing only.
// Replace with the MongoDB users once the database schema is final.
const DEMO_ACCOUNTS: Omit<UserRecord, 'passwordHash'>[] = [
  {
    id: 'demo-student',
    name: 'Demo Student',
    email: 'student@example.com',
    role: 'student',
  },
  {
    id: 'demo-faculty',
    name: 'Demo Faculty',
    email: 'faculty@example.com',
    role: 'faculty',
  },
  {
    id: 'demo-admin',
    name: 'Demo Admin',
    email: 'admin@example.com',
    role: 'admin',
  },
];

export async function createDemoUsersRepository(
  passwordService: PasswordService,
  env: NodeJS.ProcessEnv = process.env,
): Promise<UsersRepository> {
  const password = env.DEMO_USER_PASSWORD;

  if (!password) {
    return new InMemoryUsersRepository([]);
  }

  if (password.length < MIN_DEMO_PASSWORD_LENGTH) {
    throw new Error(
      `DEMO_USER_PASSWORD must be at least ${MIN_DEMO_PASSWORD_LENGTH} characters long`,
    );
  }

  const users: UserRecord[] = await Promise.all(
    DEMO_ACCOUNTS.map(async (account) => ({
      ...account,
      passwordHash: await passwordService.hash(password),
    })),
  );

  return new InMemoryUsersRepository(users);
}