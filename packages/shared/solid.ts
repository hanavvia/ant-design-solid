import { Accessor, JSX, untrack } from 'solid-js'
import { MaybeAccssor } from './types'

export const toValue = <T>(r: MaybeAccssor<T>): T => {
  if (typeof r === 'function') {
    return untrack(r as Accessor<T>)
  }
  return r
}

export interface Option {
  keepEmpty?: boolean
}

export const toArray = (
  children: JSX.Element,
  option: Option = {}
): JSX.Element[] => {
  let ret: JSX.Element[] = []
  if (Array.isArray(children)) {
    children.forEach((child) => {
      if ((child === undefined || child === null) && !option.keepEmpty) {
        return
      }
      if (Array.isArray(child)) {
        ret = ret.concat(toArray(child))
      } else {
        ret.push(child)
      }
    })
  } else {
    ret.push(children)
  }
  return ret
}
