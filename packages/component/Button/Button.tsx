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
      ns.m(`type-${withDefaultProps.type}`),
      ns.m(`size-${withDefaultProps.size}`),
      ns.m(`shape-${withDefaultProps.shape}`),
      ns.is('disabled', withDefaultProps.disabled),
      ns.is('loading', !!withDefaultProps.loading),
      ns.is(
        'not-icon-only',
        !!withDefaultProps.children && !!withDefaultProps.icon
      ),
      ns.is('danger', !!withDefaultProps.danger),
      ns.is('icon-only', !withDefaultProps.children && !!withDefaultProps.icon),
      ns.is('block', withDefaultProps.block),
      ns.is('ghost', withDefaultProps.ghost)
    ])
  const clickHandler = (event: MouseEvent) => {
    if (!withDefaultProps.disabled) {
      withDefaultProps.onClick?.(event)
    } else {
      event.preventDefault()
    }
  }
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
  const icon = withDefaultProps.icon ? (
    <span class={ns.e('icon')}> {withDefaultProps.icon} </span>
  ) : null
  const maybeLoading = withDefaultProps.loading ? (
    <span class={classnames(ns.e('icon'), ns.em('icon', 'loading'))}>
      <span class={classnames(ns.e('spin'))}>
        <svg
          viewBox="0 0 1024 1024"
          data-icon="loading"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"></path>
        </svg>
      </span>
    </span>
  ) : (
    icon
  )
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
