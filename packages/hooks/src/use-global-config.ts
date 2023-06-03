import { Accessor } from 'solid-js'
import { createStore } from 'solid-js/store'
import { NAMESPACE, ComponentSize, keysOf } from '@ant-design-solid/shared'

export type Color = {
  red: string
}

export interface GlobalConfig {
  size?: ComponentSize
  namespace?: string
  color?: Color
}

export const defaultGlobalConfig: GlobalConfig = {
  namespace: NAMESPACE,
  size: 'middle'
}

const [globalConfig, setGlobalConfig] =
  createStore<GlobalConfig>(defaultGlobalConfig)

export const setGlobaConfigEntirely = (config?: GlobalConfig) => {
  if (config) {
    keysOf(config).forEach((key) => {
      if (config[key]) {
        setGlobalConfig(key, config[key])
      }
    })
  }
}

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
