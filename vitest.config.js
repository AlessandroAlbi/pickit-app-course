import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.js';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      watchExclude: ['node_modules', 'dist', '.git'],
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.js', // File eseguito prima dei test
      coverage: {
        provider: 'v8', // or 'istanbul'
        reporter: ['text', 'json', 'html', 'cobertura'],
        reportsDirectory: 'coverage',
      },
    },
  }),
);
