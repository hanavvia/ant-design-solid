import { Accessor } from 'solid-js'

export type MaybeAccssor<T> = Accessor<T> | T

export type Size = 'large' | 'middle' | 'small'

export interface ConfigurableWindow {
  /*
   * Specify a custom `window` instance, e.g. working with iframes or in testing environments.
   */
  window?: Window
}
