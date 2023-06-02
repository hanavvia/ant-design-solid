import type { Component, JSX } from 'solid-js'
import { children } from 'solid-js'
import { useConfigProvider } from '..'

export interface ButtonProps {
  children?: JSX.Element
}

export const Button: Component<ButtonProps> = (props) => {
  const p = useConfigProvider()
  return (
    <button>
      {p?.color?.primary}
      {children(() => props.children)()}
    </button>
  )
}
