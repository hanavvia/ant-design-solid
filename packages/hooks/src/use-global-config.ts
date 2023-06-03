import { Accessor } from 'solid-js'
import { createStore } from 'solid-js/store'
import { Size } from '@ant-design-solid/shared'

export type Color = {
  red: string
}

export interface GlobalConfig {
  size?: Size
  namespace?: string
  color?: Color
}

export const defaultGlobalConfig: GlobalConfig = {
  namespace: 'ant',
  size: 'middle'
}

const [globalConfig, setGlobalConfig] =
  createStore<GlobalConfig>(defaultGlobalConfig)

export function useGlobalConfig<
  K extends keyof GlobalConfig,
  D extends GlobalConfig[K]
>(key: K, defaultValue?: D): Accessor<D>
export function useGlobalConfig(): GlobalConfig
export function useGlobalConfig(
  key?: keyof GlobalConfig,
  defaultValue = undefined
) {
  if (key) {
    return () => {
      return globalConfig[key] || defaultValue
    }
  } else {
    return globalConfig || defaultValue
  }
}

export { setGlobalConfig }
