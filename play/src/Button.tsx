import {
  Button,
  ConfigProvider,
} from '@ant-design-solid/component'

export default () => {
  return (
    <ConfigProvider>
      <Button>默认按钮</Button>
      <Button type="primary">主要按钮</Button>
    </ConfigProvider>
  )
}
