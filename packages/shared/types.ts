import { Accessor } from 'solid-js'

export type MaybeAccssor<T> = Accessor<T> | T

export type ComponentSize = 'large' | 'middle' | 'small' | undefined

export interface ConfigurableWindow {
  /*
   * Specify a custom `window` instance, e.g. working with iframes or in testing environments.
   */
  window?: Window
}
