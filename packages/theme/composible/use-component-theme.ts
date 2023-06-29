import { Accessor, onMount } from 'solid-js'

export const useComponentTheme = <T>(el?: HTMLElement, token?: Accessor<T>) => {
  onMount(() => {
    el?.style.setProperty('', '')
    console.log(el)
    console.log(token)
  })
}
