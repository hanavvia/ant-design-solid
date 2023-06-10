import { useFlexGapSupport } from '@ant-design-solid/hooks'
import { useNamespace } from '@ant-design-solid/hooks'
import { ComponentSize, MaybeAccssor, toArray } from '@ant-design-solid/shared'
import { useConfigProvider } from 'ant-design-solid'
import classNames from 'classnames'
import {
  Component,
  createContext,
  createMemo,
  createSignal,
  mergeProps
} from 'solid-js'
import { JSX } from 'solid-js'
import Item from './Item'
import Compact, { SpaceCompactProps } from './Compact'

export interface SpaceProps extends JSX.HTMLAttributes<HTMLDivElement> {
  ref?: HTMLDivElement
  className?: string
  rootClassName?: string
  style?: JSX.CSSProperties
  size?: ComponentSize | [ComponentSize, ComponentSize]
  direction?: 'horizontal' | 'vertical'
  // No `stretch` since many components do not support that.
  align?: 'start' | 'end' | 'center' | 'baseline'
  split?: JSX.Element
  wrap?: boolean
}

export interface ISpaceContext {
  latestIndex: MaybeAccssor<number>
  horizontalSize: MaybeAccssor<number>
  verticalSize: MaybeAccssor<number>
  supportFlexGap: MaybeAccssor<boolean>
}

export const SpaceContext = createContext<ISpaceContext>({
  latestIndex: 0,
  horizontalSize: 0,
  verticalSize: 0,
  supportFlexGap: false
})

const spaceSize = {
  small: 8,
  middle: 16,
  large: 24
}

function getNumberSize(size: ComponentSize) {
  return typeof size === 'string' ? spaceSize[size] : size || 0
}

export type SpaceType = Component<SpaceProps> & {
  Compact?: Component<SpaceCompactProps>
}

export const Space: SpaceType = (props) => {
  const globalConfig = useConfigProvider()
  const supportFlexGap = useFlexGapSupport()
  const merged = mergeProps<SpaceProps[]>(
    { size: 'small', direction: 'horizontal' },
    props
  )

  // [horizontalSize, verticalSize]
  const gapSize = createMemo(() =>
    (
      (Array.isArray(merged.size)
        ? merged.size
        : [merged.size, merged.size]) as [ComponentSize, ComponentSize]
    ).map((item) => getNumberSize(item))
  )
  const align = createMemo(() =>
    merged.align === undefined && merged.direction === 'horizontal'
      ? 'center'
      : merged.align
  )
  const ns = useNamespace('space')

  const clz = () =>
    classNames(
      ns.b(),
      ns.m(merged.direction),
      {
        [`${ns.m('rtl')}`]: globalConfig.direction === 'rtl',
        [`${ns.m(`align-${align()}`)}`]: align()
      },
      merged.className,
      merged.rootClassName
    )
  const marginDirection = () =>
    globalConfig.direction === 'rtl' ? 'marginLeft' : 'marginRight'

  const gapStyle = () => {
    const style: JSX.CSSProperties = {}
    if (merged.wrap) {
      style['flex-wrap'] = 'wrap'

      // Patch for gap not support
      if (!supportFlexGap) {
        style['margin-bottom'] = `${-gapSize()[1]}px`
      }
    }

    if (supportFlexGap()) {
      style['column-gap'] = `${gapSize()[0]}px`
      style['row-gap'] = `${gapSize()[1]}px`
    }
    return style
  }

  // Calculate latest one
  const [latestIndex, setLastIndex] = createSignal(0)
  const childNodes = () => toArray(props.children, { keepEmpty: true })
  setLastIndex(childNodes().length - 1)
  const nodes = () =>
    childNodes().map((child, i) => {
      return (
        <Item
          className={ns.e('item')}
          direction={merged.direction}
          index={i}
          marginDirection={marginDirection()}
          split={merged.split}
          wrap={merged.wrap}
        >
          {child}
        </Item>
      )
    })

  const spaceContext = createMemo(() => ({
    horizontalSize: () => gapSize()[0],
    verticalSize: () => gapSize()[1],
    latestIndex: () => latestIndex(),
    supportFlexGap: () => supportFlexGap()
  }))

  return (
    <div ref={props.ref} class={clz()} style={gapStyle()}>
      <SpaceContext.Provider value={spaceContext()}>
        {nodes()}
      </SpaceContext.Provider>
    </div>
  )
}

Space.Compact = Compact
