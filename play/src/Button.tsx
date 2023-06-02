import {
  Button,
  ConfigProvider,
  useConfigProvider
} from '@ant-design-solid/component'

export default () => {
  return (
    <ConfigProvider>
      <Button>按钮</Button>
    </ConfigProvider>
  )
}
