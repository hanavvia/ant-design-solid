import { Accessor, untrack } from 'solid-js'
import { MaybeAccssor } from './types'

export const toValue = <T>(r: MaybeAccssor<T>): T => {
  if (typeof r === 'function') {
    return untrack(r as Accessor<T>)
  }
  return r
}
