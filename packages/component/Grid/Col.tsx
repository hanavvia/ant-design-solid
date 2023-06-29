import classNames from 'classnames'
import RowContext from './row-context'
import {
  Component,
  JSX,
  children,
  createEffect,
  splitProps,
  useContext
} from 'solid-js'
import { useGlobalConfig, useNamespace } from '@ant-design-solid/hooks'
import { toValue } from '@ant-design-solid/shared'
import { toPx } from '@ant-design-solid/theme/util/sizeUnit'

export type LiteralUnion<T extends string> = T | (string & object)

// https://github.com/ant-design/ant-design/issues/14324
type ColSpanType = number | string

type FlexType = number | LiteralUnion<'none' | 'auto'>

export interface ColSize {
  flex?: FlexType
  span?: ColSpanType
  order?: ColSpanType
  offset?: ColSpanType
  push?: ColSpanType
  pull?: ColSpanType
}

export interface ColProps extends JSX.HTMLAttributes<HTMLDivElement> {
  ref?: HTMLDivElement
  children?: JSX.Element
  flex?: FlexType
  span?: ColSpanType
  order?: ColSpanType
  offset?: ColSpanType
  push?: ColSpanType
  pull?: ColSpanType
  xs?: ColSpanType | ColSize
  sm?: ColSpanType | ColSize
  md?: ColSpanType | ColSize
  lg?: ColSpanType | ColSize
  xl?: ColSpanType | ColSize
  xxl?: ColSpanType | ColSize
  prefixCls?: string
}

function parseFlex(flex: FlexType): string {
  if (typeof flex === 'number') {
    return `${flex} ${flex} auto`
  }

  if (/^\d+(\.\d+)?(px|em|rem|%)$/.test(flex)) {
    return `0 0 ${flex}`
  }

  return flex
}
const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const
export const Col: Component<ColProps> = (props) => {
  const direction = useGlobalConfig('direction')
  const { gutter, wrap, supportFlexGap } = useContext(RowContext)

  const [local, others] = splitProps(props, [
    'span',
    'order',
    'offset',
    'push',
    'pull',
    'flex',
    'style'
  ])

  const ns = useNamespace('col')

  const sizeClassObj = () => {
    let result = {}
    sizes.forEach((size) => {
      let sizeProps: ColSize = {}
      const propSize = props[size]
      if (typeof propSize === 'number') {
        sizeProps.span = propSize
      } else if (typeof propSize === 'object') {
        sizeProps = propSize || {}
      }

      delete others[size]

      result = {
        ...result,
        [`${ns.m(`${size}-${sizeProps.span}`)}`]: sizeProps.span !== undefined,
        [`${ns.m(`${size}-order-${sizeProps.order}`)}`]:
          sizeProps.order || sizeProps.order === 0,
        [`${ns.m(`${size}-offset-${sizeProps.offset}`)}`]:
          sizeProps.offset || sizeProps.offset === 0,
        [`${ns.m(`${size}-push-${sizeProps.push}`)}`]:
          sizeProps.push || sizeProps.push === 0,
        [`${ns.m(`${size}-pull-${sizeProps.pull}`)}`]:
          sizeProps.pull || sizeProps.pull === 0,
        [`${ns.m(`${size}-flex-${sizeProps.flex}`)}`]:
          sizeProps.flex || (sizeProps.flex as FlexType | undefined) === 'auto',
        // sizeProps.flex || sizeProps.flex === 'auto',
        [`${ns.is('rtl')}`]: direction() === 'rtl'
      }
    })

    return result
  }

  const classes = () =>
    classNames(
      ns.b(),
      {
        [`${ns.m(`${local.span}`)}`]: local.span !== undefined,
        [`${ns.m(`order-${local.order}`)}`]: local.order,
        [`${ns.m(`offset-${local.offset}`)}`]: local.offset,
        [`${ns.m(`push-${local.push}`)}`]: local.push,
        [`${ns.m(`pull-${local.pull}`)}`]: local.pull
      },
      sizeClassObj()
    )

  const mergedStyle = () => {
    const result: JSX.CSSProperties = {}
    // Horizontal gutter use padding
    if (gutter && toValue(gutter)[0] > 0) {
      const horizontalGutter = toValue(gutter)[0] / 2
      result['padding-left'] = toPx(horizontalGutter)
      result['padding-right'] = toPx(horizontalGutter)
    }

    // Vertical gutter use padding when gap not support
    if (gutter && toValue(gutter)[1] > 0 && !toValue(supportFlexGap)) {
      const verticalGutter = toValue(gutter)[1] / 2
      result['padding-top'] = toPx(verticalGutter)
      result['padding-bottom'] = toPx(verticalGutter)
    }

    if (local.flex) {
      result.flex = parseFlex(local.flex)

      // Hack for Firefox to avoid size issue
      // https://github.com/ant-design/ant-design/pull/20023#issuecomment-564389553
      if (toValue(wrap) === false && !result['min-width']) {
        result['min-width'] = '0px'
      }
    }
    return result
  }

  return (
    <div
      {...others}
      style={{ ...mergedStyle(), ...(local.style as unknown as object) }}
      class={classes()}
      ref={props.ref}
    >
      {children(() => props.children)()}
    </div>
  )
}
