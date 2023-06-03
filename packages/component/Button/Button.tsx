import { useGlobalConfig } from '@ant-design-solid/hooks'
import { useNamespace } from '@ant-design-solid/hooks/src/use-namespace'
import { Component, JSX, mergeProps } from 'solid-js'
import { children } from 'solid-js'
import classnames from 'classnames'
import { ComponentSize } from '@ant-design-solid/shared'

export type ButtonHtmlType = 'submit' | 'reset' | 'button'
export type ButtonShape = 'default' | 'circle' | 'round'
export type ButtonType =
  | 'primary'
  | 'ghost'
  | 'dashed'
  | 'link'
  | 'text'
  | 'default'
export type ButtonLoading =
  | boolean
  | {
      delay: number
    }

export interface ButtonProps {
  children?: JSX.Element
  block?: boolean
  disabled?: boolean
  classNames?: unknown //TODO
  danger?: boolean
  ghost?: boolean
  href?: string
  htmlType?: ButtonHtmlType
  icon?: JSX.Element
  loading?: ButtonLoading
  shape?: ButtonShape
  size?: ComponentSize
  target?: string
  type?: ButtonType
  onClick?: (event: MouseEvent) => void
}

export const defaultButtonProps: ButtonProps = {
  block: false,
  danger: false,
  disabled: false,
  ghost: false,
  htmlType: 'button',
  loading: false,
  shape: 'default',
  size: 'middle',
  type: 'default'
}

export const Button: Component<ButtonProps> = (props) => {
  const ns = useNamespace('button')
  const withDefaultProps = mergeProps(
    { size: useGlobalConfig('size')() },
    defaultButtonProps,
    props
  )
  const clz = () =>
    classnames([
      ns.b(),
      ns.em('type', withDefaultProps.type),
      ns.em('size', withDefaultProps.size),
      ns.em('shape', withDefaultProps.shape),
      ns.is('disabled', withDefaultProps.disabled),
      ns.is('loading', !!withDefaultProps.loading)
    ])
  const clickHandler = (event: MouseEvent) => {
    if (!withDefaultProps.disabled) {
      withDefaultProps.onClick?.(event)
    }
  }
  return (
    <button
      type={withDefaultProps.htmlType}
      class={clz()}
      onClick={clickHandler}
    >
      {children(() => props.children)()}
    </button>
  )
}
