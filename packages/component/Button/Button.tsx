import { setGlobalConfig, useGlobalConfig } from '@ant-design-solid/hooks'
import type { Component, JSX } from 'solid-js'
import { children } from 'solid-js'

export interface ButtonProps {
  children?: JSX.Element
}

export const Button: Component<ButtonProps> = (props) => {
  const ns = useGlobalConfig()
  return (
    <button
      onClick={() => {
        setGlobalConfig('namespace', 'el')
      }}
    >
      {ns.namespace}
      {children(() => props.children)()}
    </button>
  )
}
