import {
  MaybeAccssor,
  ConfigurableWindow,
  defaultWindow,
  toValue
} from '@ant-design-solid/shared'
import { createEffect, createSignal, onMount } from 'solid-js'

export interface UseCssVarOptions extends ConfigurableWindow {
  initialValue?: string
  /**
   * TODO
   * Use MutationObserver to monitor variable changes
   * @default false
   */
  observe?: boolean
}

export const useCssVar = (
  prop: MaybeAccssor<string> | string,
  target?: HTMLElement,
  options: UseCssVarOptions = {}
) => {
  const { window = defaultWindow, initialValue = '' } = options
  const [variable, setVariable] = createSignal(initialValue)
  const [targetSignal, setTargetSignal] = createSignal(target)
  const updateCssvar = () => {
    targetSignal()?.style.setProperty(toValue(prop), variable())
  }
  onMount(() => {
    setTargetSignal(target || window?.document?.documentElement)
    updateCssvar()
  })
  createEffect(updateCssvar)
  return setVariable
}
