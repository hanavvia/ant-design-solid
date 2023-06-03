import { isClient } from './is'

export const defaultWindow = isClient ? window : undefined
