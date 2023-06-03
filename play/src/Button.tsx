import { Button, ConfigProvider } from '@ant-design-solid/component'

export default () => {
  return (
    <ConfigProvider>
      <div style={{ display: 'inline-flex', gap: '8px' }}>
        <Button type="default">default按钮</Button>
        <Button type="primary">primary按钮</Button>
        <Button type="dashed">dashed按钮</Button>
        <Button type="text">text按钮</Button>
        <Button type="link">link按钮</Button>
      </div>
    </ConfigProvider>
  )
}
