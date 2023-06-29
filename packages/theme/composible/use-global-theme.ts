import { useGlobalConfig } from '@ant-design-solid/hooks'
import { createEffect } from 'solid-js'
import { keysOf } from '@ant-design-solid/shared'

export const useGlobalTheme = () => {
  const globalToken = useGlobalConfig('token')
  createEffect(() => {
    keysOf(globalToken() || {}).forEach((key) => {
      document.documentElement.style.setProperty(key, '')
    })
  })
}
