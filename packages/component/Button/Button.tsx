import { useCssVar } from '@ant-design-solid/hooks/src/use-css-var'
import type { Component, JSX } from 'solid-js'
import { children } from 'solid-js'

export interface ButtonProps {
  children?: JSX.Element
}

export const Button: Component<ButtonProps> = (props) => {
  const setVariable = useCssVar('--color')
  return (
    <button
      style={{
        color: 'var(--color)'
      }}
      onClick={() => {
        setVariable('red')
      }}
    >
      {children(() => props.children)()}
    </button>
  )
}
