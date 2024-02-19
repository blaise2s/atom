import react from '@vitejs/plugin-react-swc';
import autoprefixer from 'autoprefixer';
import { glob } from 'glob';
import { fileURLToPath } from 'node:url';
import { extname, relative, resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    libInjectCss(),
    dts({ include: 'lib' }),
    // dts({ include: 'lib', exclude: 'lib/**/*.stories.{ts,tsx}' }),
  ],
  css: {
    postcss: {
      plugins: [autoprefixer({})],
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      formats: ['es'],
    },
    copyPublicDir: false,
    rollupOptions: {
      external: ['react', 'react/jsx-runtime'],
      input: {
        ...Object.fromEntries(
          glob
            .sync('lib/**/*.{ts,tsx}')
            // .sync('lib/**/*.{ts,tsx}', { ignore: 'lib/**/*.stories.{ts,tsx}' })
            .map((file) => [
              // The name of the entry point
              // lib/nested/foo.ts becomes nested/foo
              relative(
                'lib',
                file.slice(0, file.length - extname(file).length)
              ),
              // The absolute path to the entry file
              // lib/nested/foo.ts becomes /project/lib/nested/foo.ts
              fileURLToPath(new URL(file, import.meta.url)),
            ])
        ),
        // Generated styles
        ...Object.fromEntries(
          glob.sync('lib/styles/*.css').map((file) => [
            // The name of the entry point
            // lib/nested/foo.ts becomes nested/foo
            relative('lib', file.slice(0, file.length - extname(file).length)),
            // The absolute path to the entry file
            // lib/nested/foo.ts becomes /project/lib/nested/foo.ts
            fileURLToPath(new URL(file, import.meta.url)),
          ])
        ),
      },
      output: {
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: '[name].js',
      },
    },
  },
  resolve: {
    alias: {
      components: '/lib/components',
      // styles: '/lib/styles',
    },
  },
});
