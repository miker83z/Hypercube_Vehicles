// rollup.config.js
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import { minify } from 'uglify-es'
import replace from 'rollup-plugin-replace'

export default {
  entry: 'src/index.js',
  targets: [
    {
      dest: 'dist/js.performance.es.js', // equivalent to --output
      format: 'es'
    },
    {
      dest: 'dist/js.performance.umd.js',
      format: 'umd',
      moduleName: 'JSPerf'
    },
    {
      dest: 'dist/js.performance.cjs.js', // equivalent to --output
      format: 'cjs'
    }
  ],
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**' // only transpile our source code
    }),
    uglify({}, minify),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
}
