import { createSignal, createEffect } from 'solid-js'
import { detectFlexGapSupported } from '@ant-design-solid/shared'

export const useFlexGapSupport = () => {
  const [flexible, setFlexible] = createSignal(false)
  createEffect(() => {
    setFlexible(detectFlexGapSupported())
  }, [])

  return flexible
}
