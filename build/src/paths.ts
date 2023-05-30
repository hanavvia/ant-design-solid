import { resolve } from 'path'

export const ROOT = resolve(__dirname, '../')

export const PKG = resolve(ROOT, 'packages')
export const PKG_COMPONENT = resolve(PKG, 'component')
export const PKG_ANT = resolve(PKG,'ant-design')


/** `/dist` */
export const BUILD_OUTPUT = resolve(ROOT, 'dist')
/** `/dist/element-plus` */
export const ANTD_OUTPUT = resolve(BUILD_OUTPUT, 'ant_design_solid')