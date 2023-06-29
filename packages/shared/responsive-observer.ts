import type { GlobalToken } from '../theme/interface'
import { useToken } from '@ant-design-solid/theme'
import { keysOf } from './objects'
import { pxToNumber } from '@ant-design-solid/theme/util/sizeUnit'

export type Breakpoint = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs'
export type BreakpointMap = Record<Breakpoint, string>
export type ScreenMap = Partial<Record<Breakpoint, boolean>>
export type ScreenSizeMap = Partial<Record<Breakpoint, number>>

export const responsiveArray: Breakpoint[] = [
  'xxl',
  'xl',
  'lg',
  'md',
  'sm',
  'xs'
]
type SubscribeFunc = (screens: ScreenMap) => void

const getResponsiveMap = (token?: Partial<GlobalToken>): BreakpointMap => ({
  xs: `(max-width: ${token?.screenXSMax}px)`,
  sm: `(min-width: ${token?.screenSM}px)`,
  md: `(min-width: ${token?.screenMD}px)`,
  lg: `(min-width: ${token?.screenLG}px)`,
  xl: `(min-width: ${token?.screenXL}px)`,
  xxl: `(min-width: ${token?.screenXXL}px)`
})

/**
 * Ensures that the breakpoints token are valid, in good order
 * For each breakpoint : screenMin <= screen <= screenMax and screenMax <= nextScreenMin
 */
const validateBreakpoints = (token?: Partial<GlobalToken>) => {
  const indexableToken: any = token
  const revBreakpoints = [...responsiveArray].reverse()

  revBreakpoints.forEach((breakpoint: Breakpoint, i: number) => {
    const breakpointUpper = breakpoint.toUpperCase()
    const screenMin = `screen${breakpointUpper}Min`
    const screen = `screen${breakpointUpper}`

    if (
      !(
        pxToNumber(indexableToken[screenMin]) <=
        pxToNumber(indexableToken[screen])
      )
    ) {
      throw new Error(
        `${screenMin}<=${screen} fails : !(${indexableToken[screenMin]}<=${indexableToken[screen]})`
      )
    }

    if (i < revBreakpoints.length - 1) {
      const screenMax = `screen${breakpointUpper}Max`

      if (
        !(
          pxToNumber(indexableToken[screen]) <=
          pxToNumber(indexableToken[screenMax])
        )
      ) {
        throw new Error(
          `${screen}<=${screenMax} fails : !(${pxToNumber(
            indexableToken[screen]
          )}<=${pxToNumber(indexableToken[screenMax])})`
        )
      }

      const nextBreakpointUpperMin: string = revBreakpoints[i + 1].toUpperCase()
      const nextScreenMin = `screen${nextBreakpointUpperMin}Min`

      if (
        !(
          pxToNumber(indexableToken[screenMax]) <=
          pxToNumber(indexableToken[nextScreenMin])
        )
      ) {
        throw new Error(
          `${screenMax}<=${nextScreenMin} fails : !(${pxToNumber(
            indexableToken[screenMax]
          )}<=${pxToNumber(indexableToken[nextScreenMin])})`
        )
      }
    }
  })
  return token
}

export const useResponsiveObserver = () => {
  const token = useToken()
  // TODO default Token
  const responsiveMap: BreakpointMap = getResponsiveMap(
    validateBreakpoints(token())
  )

  // return () => {

  // }

  const subscribers = new Map<number, SubscribeFunc>()
  let subUid = -1
  let screens = {}

  return {
    matchHandlers: {} as {
      [prop: string]: {
        mql: MediaQueryList
        listener:
          | ((this: MediaQueryList, ev: MediaQueryListEvent) => any)
          | null
      }
    },
    dispatch(pointMap: ScreenMap) {
      screens = pointMap
      subscribers.forEach((func) => func(screens))
      return subscribers.size >= 1
    },
    subscribe(func: SubscribeFunc): number {
      if (!subscribers.size) this.register()
      subUid += 1
      subscribers.set(subUid, func)
      func(screens)
      return subUid
    },
    unsubscribe(paramToken: number) {
      subscribers.delete(paramToken)
      if (!subscribers.size) this.unregister()
    },
    unregister() {
      keysOf(responsiveMap).forEach((screen: Breakpoint) => {
        const matchMediaQuery = responsiveMap[screen]
        const handler = this.matchHandlers[matchMediaQuery]
        if (handler?.listener) {
          handler?.mql.removeEventListener('change', handler.listener)
        }
      })
      subscribers.clear()
    },
    register() {
      keysOf(responsiveMap).forEach((screen: Breakpoint) => {
        const matchMediaQuery = responsiveMap[screen]
        const listener = ({ matches }: { matches: boolean }) => {
          this.dispatch({
            ...screens,
            [screen]: matches
          })
        }
        const mql = window.matchMedia(matchMediaQuery)
        mql.addEventListener('change', listener)
        this.matchHandlers[matchMediaQuery] = {
          mql,
          listener
        }

        listener(mql)
      })
    },
    responsiveMap
  }
}
