import { setGlobalConfig } from '@ant-design-solid/hooks'
import { useCssVar } from '@ant-design-solid/hooks/src/use-css-var'
import { useNamespace } from '@ant-design-solid/hooks/src/use-namespace'
import type { Component, JSX } from 'solid-js'
import { children } from 'solid-js'

export interface ButtonProps {
  children?: JSX.Element
}

export const Button: Component<ButtonProps> = (props) => {
  const setVariable = useCssVar('--color')
  const ns = useNamespace('button')
  return (
    <button
      style={{
        color: 'var(--color)'
      }}
      onClick={() => {
        setVariable('red')
        setGlobalConfig('namespace', 'el')
      }}
    >
      {ns.b()}
      {children(() => props.children)()}
    </button>
  )
}
