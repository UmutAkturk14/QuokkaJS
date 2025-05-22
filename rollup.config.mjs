import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';

export default [
  {
    input: 'src/main.ts',
    output: [
      { file: 'dist/quokka.cjs.js', format: 'cjs', exports: 'named' },
      { file: 'dist/quokka.es.js', format: 'es', exports: 'named' },
      { file: 'dist/quokka.iife.js', format: 'iife', name: 'Q' }
    ],
    plugins: [typescript()]
  },
  {
    input: 'src/main.ts',
    output: { file: 'dist/main.d.ts', format: 'es' },
    plugins: [dts()]
  }
];
