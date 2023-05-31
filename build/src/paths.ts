import { resolve } from 'path'

export const ROOT = resolve(__dirname, '../../')

export const PKG = resolve(ROOT, 'packages')
export const PKG_COMPONENT = resolve(PKG, 'component')
export const PKG_ANT = resolve(PKG,'ant-design-solid')
export const BUILD_ROOT = resolve(ROOT, 'build')

/** `/dist` */
export const BUILD_OUTPUT = resolve(ROOT, 'dist')
/** `/dist/ant_design_solid` */
export const ANTD_OUTPUT = resolve(BUILD_OUTPUT, 'ant-design-solid')