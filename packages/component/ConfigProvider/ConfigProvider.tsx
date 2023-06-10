import { Component, JSX, createContext, mergeProps, useContext } from 'solid-js'
import { children } from 'solid-js'
import {
  red,
  volcano,
  orange,
  gold,
  yellow,
  lime,
  green,
  cyan,
  blue,
  geekblue,
  purple,
  magenta,
  grey,
  gray
} from '@ant-design/colors'
import { ComponentSize, NAMESPACE } from '@ant-design-solid/shared'

export const defaultColorPrimaries = {
  red: red.primary,
  volcano: volcano.primary,
  orange: orange.primary,
  gold: gold.primary,
  yellow: yellow.primary,
  lime: lime.primary,
  green: green.primary,
  cyan: cyan.primary,
  blue: blue.primary,
  geekblue: geekblue.primary,
  purple: purple.primary,
  magenta: magenta.primary,
  grey: grey.primary,
  gray: gray.primary
}

export type ColorPrimaries = keyof typeof defaultColorPrimaries
export interface IConfigProviderContext {
  namespace?: string
  color?: {
    primaries?: Partial<{
      [K in ColorPrimaries]: string
    }>
    primary?: string
  }
  space?: {
    size: ComponentSize | number
  }
  direction?: DirectionType
}

export const defaultConfigProviderContext: IConfigProviderContext = {
  namespace: NAMESPACE,
  color: {
    primaries: defaultColorPrimaries,
    primary: defaultColorPrimaries.blue
  }
}

export type DirectionType = 'ltr' | 'rtl' | undefined

export interface ConfigProviderProps extends IConfigProviderContext {
  children?: JSX.Element
}

const ConfigProviderContext = createContext<IConfigProviderContext>({})

export const useConfigProvider = () =>
  useContext<IConfigProviderContext>(ConfigProviderContext)

export const ConfigProvider: Component<ConfigProviderProps> = (props) => {
  const merged = mergeProps(defaultConfigProviderContext, props)
  return (
    <ConfigProviderContext.Provider value={merged}>
      {children(() => props.children)()}
    </ConfigProviderContext.Provider>
  )
}
