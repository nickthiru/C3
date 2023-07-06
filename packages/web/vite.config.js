import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // By default, Vite doesn't include shims for NodeJS,
    // which is necessary for sepment analytics lib to work.
    global: {},
    "process.env": {},
  },
  resolve: {
    alias: {
      "./runtimeConfig": "./runtimeConfig.browser"
    },
  }
});