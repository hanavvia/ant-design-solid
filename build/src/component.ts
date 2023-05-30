import { build } from 'unbuild'
import { PKG_COMPONENT } from './paths'

export const buildComponent = async () => {
    await build(PKG_COMPONENT, false)
}