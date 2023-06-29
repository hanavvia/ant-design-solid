import classNames from 'classnames'
import { useFlexGapSupport } from '@ant-design-solid/hooks'
import type { Breakpoint, ScreenMap } from '@ant-design-solid/shared'
import {
  useResponsiveObserver,
  responsiveArray
} from '@ant-design-solid/shared'
import RowContext from './row-context'
import {
  Component,
  JSX,
  children,
  createEffect,
  createMemo,
  createSignal,
  splitProps
} from 'solid-js'
import { useGlobalConfig, useNamespace } from '@ant-design-solid/hooks'
import { toPx } from '@ant-design-solid/theme/util/sizeUnit'

const RowAligns = ['top', 'middle', 'bottom', 'stretch'] as const
const RowJustify = [
  'start',
  'end',
  'center',
  'space-around',
  'space-between',
  'space-evenly'
] as const

type Responsive = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs'
type ResponsiveLike<T> = {
  [key in Responsive]?: T
}

type Gap = number | undefined
export type Gutter = number | undefined | Partial<Record<Breakpoint, number>>

type ResponsiveAligns = ResponsiveLike<(typeof RowAligns)[number]>
type ResponsiveJustify = ResponsiveLike<(typeof RowJustify)[number]>
export interface RowProps extends JSX.HTMLAttributes<HTMLDivElement> {
  gutter?: Gutter | [Gutter, Gutter]
  align?: (typeof RowAligns)[number] | ResponsiveAligns
  justify?: (typeof RowJustify)[number] | ResponsiveJustify
  prefixCls?: string
  wrap?: boolean
  ref?: HTMLDivElement
}

function useMergePropByScreen(
  oriProp: RowProps['align'] | RowProps['justify'],
  screen: ScreenMap
) {
  let prop = typeof oriProp === 'string' ? oriProp : ''

  const calcMergeAlignOrJustify = () => {
    if (typeof oriProp === 'string') {
      prop = oriProp
    }
    if (typeof oriProp !== 'object') {
      return
    }
    for (let i = 0; i < responsiveArray.length; i++) {
      const breakpoint: Breakpoint = responsiveArray[i]
      // if do not match, do nothing
      if (!screen[breakpoint]) continue
      const curVal = oriProp[breakpoint]
      if (curVal !== undefined) {
        prop = curVal
        return
      }
    }
  }

  createEffect(() => {
    calcMergeAlignOrJustify()
  }, [JSON.stringify(oriProp), screen])

  return prop
}

/* TODO solidjs reactive */
export const Row: Component<RowProps> = (props) => {
  const ns = useNamespace('row')
  const [local, others] = splitProps(props, [
    'prefixCls',
    'justify',
    'align',
    'classList',
    'style',
    'children',
    'gutter',
    'wrap'
  ])

  const direction = useGlobalConfig('direction')

  const [screens, setScreens] = createSignal<ScreenMap>({
    xs: true,
    sm: true,
    md: true,
    lg: true,
    xl: true,
    xxl: true
  })
  // to save screens info when responsiveObserve callback had been call
  const [curScreens, setCurScreens] = createSignal<ScreenMap>({
    xs: false,
    sm: false,
    md: false,
    lg: false,
    xl: false,
    xxl: false
  })

  // ================================== calc responsive data ==================================
  const mergeAlign = () => useMergePropByScreen(local.align, curScreens())

  console.log(mergeAlign)

  const mergeJustify = () => useMergePropByScreen(local.justify, curScreens())

  const supportFlexGap = useFlexGapSupport()

  const gutter = () => local.gutter || 0

  const responsiveObserver = useResponsiveObserver()

  // ================================== Effect ==================================
  createEffect(() => {
    const token = responsiveObserver.subscribe((screen) => {
      setCurScreens(screen)
      const currentGutter = gutter() || 0
      if (
        (!Array.isArray(currentGutter) && typeof currentGutter === 'object') ||
        (Array.isArray(currentGutter) &&
          (typeof currentGutter[0] === 'object' ||
            typeof currentGutter[1] === 'object'))
      ) {
        setScreens(screen)
      }
    })
    return () => responsiveObserver.unsubscribe(token)
  })

  // ================================== Render ==================================
  const gutters = (): [Gap, Gap] => {
    const results: [Gap, Gap] = [undefined, undefined]
    const normalizedGutter = Array.isArray(gutter())
      ? (gutter() as Array<Gutter>)
      : [gutter(), undefined]
    normalizedGutter.forEach((g, index) => {
      if (typeof g === 'object') {
        for (let i = 0; i < responsiveArray.length; i++) {
          const breakpoint: Breakpoint = responsiveArray[i]
          const newG = g as Partial<Record<Breakpoint, number>>
          if (screens()[breakpoint] && newG[breakpoint] !== undefined) {
            results[index] = newG[breakpoint] as number
            break
          }
        }
      } else {
        results[index] = g
      }
    })
    return results
  }

  const classes = classNames(
    ns.b(),
    {
      [`${ns.m('no-wrap')}`]: local.wrap === false,
      [`${ns.m(mergeJustify())}`]: mergeJustify,
      [`${ns.m(mergeAlign())}`]: mergeAlign,
      [`${ns.is('rtl')}`]: direction() === 'rtl'
    },
    props.class,
    props.classList
  )

  // Add gutter related style
  const horizontalGutter = () =>
    gutters()[0] != null && (gutters()[0] || 0) > 0
      ? (gutters()[0] || 0) / -2
      : undefined
  const verticalGutter = () =>
    gutters()[1] != null && (gutters()[1] || 0) > 0
      ? (gutters()[1] || 0) / -2
      : undefined

  const rowStyle = () => {
    const result: JSX.CSSProperties = {}

    if (horizontalGutter) {
      result['margin-left'] = toPx(horizontalGutter())
      result['margin-right'] = toPx(horizontalGutter())
    }
    if (supportFlexGap()) {
      // Set gap direct if flex gap support
      result['row-gap'] = toPx(gutters()[1] || 0)
    } else if (verticalGutter) {
      result['margin-top'] = toPx(verticalGutter())
      result['margin-bottom'] = toPx(verticalGutter())
    }

    return result
  }

  // "gutters" is a new array in each rendering phase, it'll make 'React.useMemo' effectless.
  // So we deconstruct "gutters" variable here.
  // const [gutterH, gutterV] = gutters
  const rowContext = createMemo(() => ({
    gutter: () => gutters() as [number, number],
    wrap: local.wrap,
    supportFlexGap
  }))

  return (
    <RowContext.Provider value={rowContext()}>
      <div
        {...others}
        class={classes}
        style={{ ...rowStyle, ...(local.style as unknown as object) }}
        ref={props.ref}
      >
        {children(() => props.children)()}
      </div>
    </RowContext.Provider>
  )
}
