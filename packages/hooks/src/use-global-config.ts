import { Accessor } from 'solid-js'
import { createStore } from 'solid-js/store'
import { NAMESPACE, ComponentSize, keysOf } from '@ant-design-solid/shared'
import { GlobalToken } from '@ant-design-solid/theme'
import theme from '@ant-design-solid/theme'

export type Color = {
  red: string
}

export type DirectionType = 'ltr' | 'rtl' | undefined

export interface GlobalConfig {
  size?: ComponentSize
  namespace?: string
  color?: Color
  direction?: DirectionType
  token?: Partial<GlobalToken>
}

export const defaultGlobalConfig: GlobalConfig = {
  namespace: NAMESPACE,
  size: 'middle',
  token: theme.formatToken({
    ...theme.defaultAlgorithm(theme.defaultSeed),
    override: {}
  })
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
