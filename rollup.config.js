import babel from 'rollup-plugin-babel'
import pkg from './package.json'
import scss from 'rollup-plugin-scss'
import sass from 'rollup-plugin-sass'

export default {
  input: 'src/index.jsx',
  output: [
    {
      file: pkg.main,
      format: 'cjs'
    },
    {
      file: pkg.module,
      format: 'es'
    }
  ],
  external: [
    'react',
    'react-dom',
    'prop-types'
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    }),
    scss({
      failOnError: true
    }),
    sass({
      insert: true
    })
  ]
}
