import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import postCssMergeRules from 'postcss-merge-rules';
import tailwindcssConfig from './tailwind.config';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  css: {
    postcss: {
      plugins: [postCssMergeRules({}), tailwindcss(tailwindcssConfig), autoprefixer({})],
    },
  },
});
