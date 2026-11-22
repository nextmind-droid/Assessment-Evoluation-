import type { LoginRole } from './dto/login.dto.js';

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: LoginRole;
}

export abstract class UsersRepository {
  abstract findByEmail(email: string): Promise<UserRecord | null>;
}

export class InMemoryUsersRepository extends UsersRepository {
  constructor(private readonly users: UserRecord[]) {
    super();
  }

  findByEmail(email: string): Promise<UserRecord | null> {
    const wanted = email.trim().toLowerCase();
    const user = this.users.find((item) => item.email.toLowerCase() === wanted);
    return Promise.resolve(user ?? null);
  }
}