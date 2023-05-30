import { series, parallel } from 'gulp'
import { runTask } from './src'

export default series(
    parallel(
      runTask('buildFullBundle'),
    ),
  )