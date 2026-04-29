import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    name: 'Counter Tab',
    description: 'A simple counter as your new tab page.',
    permissions: ['storage'],
  },
});
