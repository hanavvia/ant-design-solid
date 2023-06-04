import { Button, ConfigProvider, Icon } from '@ant-design-solid/component'
import { SearchOutlined } from '../../packages/icons'

export default () => {
  return (
    <ConfigProvider>
      <h1>Type</h1>
      <div style={{ display: 'inline-flex', gap: '8px' }}>
        <Button type="default">Default Button</Button>
        <Button type="primary">primary Button</Button>
        <Button type="dashed">dashed Button</Button>
        <Button type="text">text Button</Button>
        <Button type="link" href="www.baidu.com">
          link Button
        </Button>
        <Button type="link">link Button</Button>
      </div>
      <h1>Icon</h1>
      <div style={{ display: 'inline-flex', gap: '8px' }}>
        <Button
          type="primary"
          shape="circle"
          icon={
            <Icon>
              <SearchOutlined />
            </Icon>
          }
        />
        <Button type="primary" shape="circle">
          A
        </Button>
        <Button
          type="primary"
          icon={
            <Icon>
              <SearchOutlined />
            </Icon>
          }
        >
          搜索
        </Button>
        <Button
          shape="circle"
          icon={
            <Icon>
              <SearchOutlined />
            </Icon>
          }
        />
        <Button shape="circle">A</Button>
        <Button
          icon={
            <Icon>
              <SearchOutlined />
            </Icon>
          }
        >
          搜索
        </Button>
        <Button
          type="dashed"
          shape="circle"
          icon={
            <Icon>
              <SearchOutlined />
            </Icon>
          }
        />
        <Button type="dashed" shape="circle">
          A
        </Button>
        <Button
          type="dashed"
          icon={
            <Icon>
              <SearchOutlined />
            </Icon>
          }
        >
          搜索
        </Button>
        <h1>Size</h1>
      </div>
    </ConfigProvider>
  )
}
