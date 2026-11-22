import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: { tsconfigPaths: true },
  test: {
    globals: true,
    root: './',
    include: ['**/*.e2e-spec.ts'],
    // Fake values for tests only. They are not real secrets.
    env: {
      JWT_SECRET: 'e2e-test-secret-not-for-real-use-0123456789',
      DEMO_USER_PASSWORD: 'e2e-demo-password',
    },
  },
});