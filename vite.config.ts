import path from 'path'
import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'
import type { ViteSvgrOptions } from 'vite-plugin-svgr'

import autoImport from './config/vite-auto-import'

const svgrOptions: ViteSvgrOptions = {
  exportAsDefault: false,
  include: 'src/**/*.svg',
}

export default defineConfig({
  plugins: [legacy(), react(), svgr(svgrOptions), autoImport],
  assetsInclude: ['**/*.splinecode'],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      buffer: 'rollup-plugin-node-polyfills/polyfills/buffer-es6',
      process: 'rollup-plugin-node-polyfills/polyfills/process-es6',
    },
  },
  server: {
    port: 3000,
  },
  publicDir: 'public',
  build: {
    sourcemap: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis',
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
        }),
        NodeModulesPolyfillPlugin(),
      ],
    },
  },
})
