import { series, parallel } from 'gulp'
import { runTask } from './src'

export default series(
  parallel(runTask('buildFullBundle'), runTask('generateAntdColorVar'))
  //   parallel(runTask('buildFullBundle'))
)

export * from './src'
