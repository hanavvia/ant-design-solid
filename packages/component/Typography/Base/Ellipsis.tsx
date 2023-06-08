import { JSX } from 'solid-js'

export interface EllipsisProps {
  enabledMeasure?: boolean
  text?: JSX.Element
  width: number
  fontSize: number
  rows: number
  children: JSX.Element
  onEllipsis: (isEllipsis: boolean) => void
}
