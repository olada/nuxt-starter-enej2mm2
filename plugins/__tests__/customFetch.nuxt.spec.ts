import {
  describe, expect, it, vi,
} from 'vitest';
import { mockNuxtImport, registerEndpoint } from '@nuxt/test-utils/runtime';
import {
createError, useNuxtApp,
} from '#app';
  
const { navigateToMock } = vi.hoisted(() => ({
  navigateToMock: vi.fn(async (param: string) => Promise.resolve(param)),
}));
mockNuxtImport('navigateTo', () => navigateToMock);

const endpointPath = '/the-test-endpoint';

registerEndpoint(endpointPath, {
  method: 'POST',
  handler: () => {
    throw createError({
      status: 401,
      statusMessage: 'Unauthorized',
    });
  }
});

describe('Custom Open Fetch Clients', () => { 
  it('should redirect when fetch not successful and status is 401', async () => {

  const { $api } = useNuxtApp();
  
  await expect(() => $api(endpointPath, {
    method: 'POST',
  })).rejects.toThrowError();

  expect(navigateToMock).toHaveBeenCalled();
  });
});