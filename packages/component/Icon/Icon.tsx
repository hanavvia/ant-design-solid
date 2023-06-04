import { useNamespace } from '@ant-design-solid/hooks/src/use-namespace'
import classNames from 'classnames'
import { Component, JSX, children } from 'solid-js'

export interface IConProps {
  children?: JSX.Element
  color?: string
  size?: string | number
}

export const Icon: Component<IConProps> = (props) => {
  const ns = useNamespace('icon')
  const clz = () => classNames(ns.b())
  return <i class={clz()}>{children(() => props.children)()}</i>
}
