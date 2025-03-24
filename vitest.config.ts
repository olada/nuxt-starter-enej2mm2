import { defineVitestConfig } from '@nuxt/test-utils/config';

export default defineVitestConfig({
  test: {
    include: ['**/*.spec.ts'],
    environment: 'jsdom',
  },
});
