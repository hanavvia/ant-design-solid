import { useGlobalConfig } from '@ant-design-solid/hooks'

export const useToken = () => {
  return useGlobalConfig('token')
}
