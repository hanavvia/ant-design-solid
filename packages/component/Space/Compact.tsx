import classNames from 'classnames'
import { toArray } from '@ant-design-solid/shared'

import type { DirectionType } from '../ConfigProvider'
import { ComponentSize } from '@ant-design-solid/shared'
import { useGlobalConfig } from '@ant-design-solid/hooks'

import {
  Accessor,
  Component,
  JSX,
  children,
  createContext,
  createMemo,
  splitProps,
  useContext
} from 'solid-js'
import { useNamespace } from '@ant-design-solid/hooks'

export interface SpaceCompactItemContextType {
  compactSize?: ComponentSize
  compactDirection?: 'horizontal' | 'vertical'
  isFirstItem?: boolean
  isLastItem?: boolean
}

export interface CompactItemProps extends SpaceCompactItemContextType {
  children?: JSX.Element
}

export const SpaceCompactItemContext =
  createContext<SpaceCompactItemContextType | null>(null)

export const useCompactItemContext = (direction: DirectionType) => {
  const ns = useNamespace('space-compact')
  const compactItemContext = useContext(SpaceCompactItemContext)

  const compactItemClassnames = createMemo<string>(() => {
    if (!compactItemContext) {
      return ''
    }
    const { compactDirection, isFirstItem, isLastItem } = compactItemContext
    const separator = compactDirection === 'vertical' ? 'vertical-' : ''

    return classNames({
      [`${ns.e(`${separator}item`)}`]: true,
      [`${ns.em(`${separator}item`, 'first')}`]: isFirstItem,
      [`${ns.em(`${separator}item`, 'last')}`]: isLastItem,
      [`${ns.em(`${separator}item`, 'rtl')}`]: direction === 'rtl'
    })
  })

  return {
    compactSize: compactItemContext?.compactSize,
    compactDirection: compactItemContext?.compactDirection,
    compactItemClassnames
  }
}

export const NoCompactStyle: Component<{ children?: JSX.Element }> = (
  props
) => (
  <SpaceCompactItemContext.Provider value={null}>
    {children(() => props.children)()}
  </SpaceCompactItemContext.Provider>
)

export interface SpaceCompactProps extends JSX.HTMLAttributes<HTMLDivElement> {
  prefixCls?: string
  size?: ComponentSize
  direction?: 'horizontal' | 'vertical'
  block?: boolean
  rootClassName?: string
}

const CompactItem: Component<CompactItemProps> = (props) => {
  const [lcoal, otherProps] = splitProps(props, ['children'])
  return (
    <SpaceCompactItemContext.Provider value={otherProps}>
      {children(() => lcoal.children)()}
    </SpaceCompactItemContext.Provider>
  )
}

const Compact: Component<SpaceCompactProps> = (props) => {
  const directionConfig = useGlobalConfig('direction')
  const globalSize = useGlobalConfig('size')

  const ns = useNamespace('space-compact')

  const [local, restProps] = splitProps(props, [
    'direction',
    'block',
    'prefixCls',
    'class',
    'rootClassName',
    'children'
  ])
  const mergedSize: Accessor<ComponentSize> = () =>
    props.size || globalSize() || 'middle'

  const clz = () =>
    classNames(
      ns.b(),
      {
        [`${ns.m('rtl')}`]: directionConfig() === 'rtl',
        [`${ns.m('block')}`]: local.block,
        [`${ns.m('vertical')}`]: local.direction === 'vertical'
      },
      local.class,
      local.rootClassName
    )

  const compactItemContext = useContext(SpaceCompactItemContext)

  const childNodes = toArray(local.children)
  const nodes = createMemo(() =>
    childNodes.map((child, i) => {
      return (
        <CompactItem
          compactSize={mergedSize()}
          compactDirection={local.direction}
          isFirstItem={
            i === 0 && (!compactItemContext || compactItemContext?.isFirstItem)
          }
          isLastItem={
            i === childNodes.length - 1 &&
            (!compactItemContext || compactItemContext?.isLastItem)
          }
        >
          {child}
        </CompactItem>
      )
    })
  )

  // =========================== Render ===========================
  if (childNodes.length === 0) {
    return null
  }

  return (
    <div class={clz()} {...restProps}>
      {nodes()}
    </div>
  )
}

export default Compact
