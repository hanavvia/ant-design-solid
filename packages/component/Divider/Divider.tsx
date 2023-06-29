import classNames from 'classnames'
import {
  Component,
  JSX,
  children,
  createMemo,
  mergeProps,
  splitProps
} from 'solid-js'
import { useGlobalConfig, useNamespace } from '@ant-design-solid/hooks'

export interface DividerProps {
  type?: 'horizontal' | 'vertical'
  orientation?: 'left' | 'right' | 'center'
  orientationMargin?: string | number
  className?: string
  rootClassName?: string
  children?: JSX.Element
  dashed?: boolean
  style?: JSX.CSSProperties
  plain?: boolean
}

export const Divider: Component<DividerProps> = (props) => {
  // const { getPrefixCls, direction } = useGlobalConfig('direction')
  const globalDirection = useGlobalConfig('direction')
  const ns = useNamespace('divider')

  const merged = mergeProps(
    {
      type: 'horizontal',
      orientation: 'center'
    },
    props
  )
  const [local, restProps] = splitProps(merged, [
    'type',
    'orientation',
    'orientationMargin',
    'className',
    'rootClassName',
    'children',
    'dashed',
    'plain'
  ])
  const orientationPrefix = () =>
    local.orientation.length > 0 ? `-${local.orientation}` : local.orientation
  const hasChildren = () => !!local.children
  const hasCustomMarginLeft = () =>
    local.orientation === 'left' && local.orientationMargin != null
  const hasCustomMarginRight = () =>
    local.orientation === 'right' && local.orientationMargin != null
  const classString = () =>
    classNames(
      ns.b(),
      `${ns.m(local.type)}`,
      {
        [`${ns.m('with-text')}`]: hasChildren(),
        [`${ns.m(`with-text${orientationPrefix()}`)}`]: hasChildren(),
        [`${ns.m('dashed')}`]: !!local.dashed,
        [`${ns.m('plain')}`]: !!local.plain,
        [`${ns.is('rtl')}`]: globalDirection() === 'rtl',
        [`${ns.m('no-default-orientation-margin-left')}`]:
          hasCustomMarginLeft(),
        [`${ns.m('no-default-orientation-margin-right')}`]:
          hasCustomMarginRight()
      },
      local.className,
      local.rootClassName
    )

  const memoizedOrientationMargin = createMemo<string | number>(() => {
    if (typeof local.orientationMargin === 'number') {
      return local.orientationMargin
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (/^\d+$/.test(local.orientationMargin!)) {
      return Number(local.orientationMargin)
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return local.orientationMargin!
  })

  const innerStyle: JSX.CSSProperties = {
    ...(hasCustomMarginLeft && { marginLeft: memoizedOrientationMargin }),
    ...(hasCustomMarginRight && { marginRight: memoizedOrientationMargin })
  }

  // Warning children not work in vertical mode
  if (process.env.NODE_ENV !== 'production') {
    if (local.children && local.type == 'vertical') {
      console.warn('Divider:`children` not working in `vertical` mode.')
    }
  }

  return (
    <div class={classString()} {...restProps} role="separator">
      {local.children && local.type !== 'vertical' && (
        <span class={`${ns.e('inner-text')}`} style={innerStyle}>
          {children(() => local.children)()}
        </span>
      )}
    </div>
  )
}
