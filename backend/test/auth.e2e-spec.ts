import { Test } from '@nestjs/testing';
import type { INestApplication } from '@nestjs/common';
import request from 'supertest';
import type { App } from 'supertest/types.js';
import { AppModule } from './../src/app.module.js';
import { configureApp } from './../src/app.setup.js';

const LOGIN_URL = '/api/v1/auth/login';
// Fake value from vitest.config.e2e.ts, used for the demo accounts in tests.
const DEMO_PASSWORD = 'e2e-demo-password';

describe('POST /api/v1/auth/login (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    configureApp(app);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  function postLogin(body: object) {
    return request(app.getHttpServer()).post(LOGIN_URL).send(body);
  }

  const validBody = {
    email: 'student@example.com',
    password: DEMO_PASSWORD,
    role: 'student',
  };

  it.each(['student', 'faculty', 'admin'])(
    'logs in the demo %s account',
    async (role) => {
      const response = await postLogin({
        email: `${role}@example.com`,
        password: DEMO_PASSWORD,
        role,
      }).expect(200);

      expect(response.body.tokenType).toBe('Bearer');
      expect(response.body.expiresIn).toBe(3600);
      expect(response.body.accessToken).toMatch(/^[\w-]+\.[\w-]+\.[\w-]+$/);
      expect(response.body.user.role).toBe(role);
    },
  );

  it('does not return the password hash or the user id', async () => {
    const response = await postLogin(validBody).expect(200);

    expect(response.body.user).toEqual({
      name: 'Demo Student',
      email: 'student@example.com',
      role: 'student',
    });
    expect(response.text).not.toContain('passwordHash');
  });

  it('rejects a wrong password with 401', async () => {
    const response = await postLogin({
      ...validBody,
      password: 'wrong-password',
    }).expect(401);

    expect(response.body.message).toBe('Invalid credentials');
  });

  it('rejects an unknown email with 401', async () => {
    await postLogin({ ...validBody, email: 'nobody@example.com' }).expect(401);
  });

  it('rejects a role that does not match the real role with 401', async () => {
    await postLogin({ ...validBody, role: 'admin' }).expect(401);
  });

  it('gives the same error for a wrong password and an unknown email', async () => {
    const wrongPassword = await postLogin({
      ...validBody,
      password: 'wrong-password',
    });
    const unknownEmail = await postLogin({
      ...validBody,
      email: 'nobody@example.com',
    });

    expect(wrongPassword.body).toEqual(unknownEmail.body);
  });

  it('rejects an empty body with 400', async () => {
    await postLogin({}).expect(400);
  });

  it('rejects an invalid email with 400', async () => {
    await postLogin({ ...validBody, email: 'not-an-email' }).expect(400);
  });

  it('rejects an unknown role value with 400', async () => {
    await postLogin({ ...validBody, role: 'teacher' }).expect(400);
  });

  it('rejects extra fields with 400', async () => {
    await postLogin({ ...validBody, isAdmin: true }).expect(400);
  });
});