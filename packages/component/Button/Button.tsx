import { useGlobalConfig } from '@ant-design-solid/hooks'
import { useNamespace } from '@ant-design-solid/hooks/src/use-namespace'
import { Component, JSX, mergeProps } from 'solid-js'
import { children } from 'solid-js'
import classnames from 'classnames'
import { Loading } from './Loading'
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

  const clickHandler = (event: MouseEvent) => {
    if (!withDefaultProps.disabled) {
      withDefaultProps.onClick?.(event)
    } else {
      event.preventDefault()
    }
  }
  const icon = withDefaultProps.icon ? (
    <span class={ns.e('icon')}> {withDefaultProps.icon} </span>
  ) : null
  const maybeLoading = withDefaultProps.loading ? (
    <span class={classnames(ns.e('icon'), ns.em('icon', 'loading'))}>
      <span class={classnames(ns.e('spin'))}>
        <Loading />
      </span>
    </span>
  ) : (
    icon
  )
  const clz = () =>
    classnames([
      ns.b(),
      ns.m(`type-${withDefaultProps.type}`),
      ns.m(`size-${withDefaultProps.size}`),
      ns.m(`shape-${withDefaultProps.shape}`),
      ns.is('disabled', withDefaultProps.disabled),
      ns.is('loading', !!withDefaultProps.loading),
      ns.is('not-icon-only', !!withDefaultProps.children && !!maybeLoading),
      ns.is('danger', !!withDefaultProps.danger),
      ns.is('icon-only', !withDefaultProps.children && !!withDefaultProps.icon),
      ns.is('block', withDefaultProps.block),
      ns.is('ghost', withDefaultProps.ghost)
    ])
  const renderTagA = () =>
    withDefaultProps.href || withDefaultProps.type === 'link'
  if (renderTagA()) {
    return (
      <a
        class={clz()}
        target={withDefaultProps.target}
        href={withDefaultProps.href}
        onClick={clickHandler}
      >
        <span>{children(() => props.children)()}</span>
      </a>
    )
  }
  return (
    <button
      type={withDefaultProps.htmlType}
      class={clz()}
      onClick={clickHandler}
    >
      {maybeLoading}
      <span>{children(() => props.children)()}</span>
    </button>
  )
}
