import { MaybeAccssor } from '@ant-design-solid/shared'
import { createContext } from 'solid-js'

export interface RowContextState {
  gutter?: MaybeAccssor<[number, number]>
  wrap?: MaybeAccssor<boolean>
  supportFlexGap?: MaybeAccssor<boolean>
}

const RowContext = createContext<RowContextState>({})

export default RowContext
