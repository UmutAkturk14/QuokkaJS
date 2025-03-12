import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/main.ts',
  output: {
    file: 'dist/main.js',
    format: 'iife',
    name: '$',
    sourcemap: true
  },
  plugins: [typescript()]
};
