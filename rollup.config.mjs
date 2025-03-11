import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/main.ts',  // Entry file
  output: {
    file: 'dist/main.js', // Compiled output file
    format: 'iife',       // IIFE format for direct browser usage
    name: '$',            // Exposes your library as a global `$` (like jQuery)
    sourcemap: true
  },
  plugins: [typescript()]
};
