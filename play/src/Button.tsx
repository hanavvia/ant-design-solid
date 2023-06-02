import {
  Button,
  ConfigProvider,
  useConfigProvider
} from '@ant-design-solid/component'

export default () => {
  return (
    <ConfigProvider color={{ primary: 'blue' }}>
      <Button>按钮</Button>
    </ConfigProvider>
  )
}
