import { Button, ConfigProvider, Icon } from '@ant-design-solid/component'
import { SearchOutlined } from '../../packages/icons'
import { createSignal } from 'solid-js'
import { ComponentSize } from '@ant-design-solid/shared'

export default () => {
  const [size, setSize] = createSignal<ComponentSize>('middle')
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
      </div>
      <h1>Size</h1>
      <Button onClick={() => setSize('small')}>small</Button>
      <Button onClick={() => setSize('middle')}>middle</Button>
      <Button onClick={() => setSize('large')}>large</Button>
      <div style={{ display: 'flex', gap: '8px', 'margin-top': '8px' }}>
        <Button
          size={size()}
          type="primary"
          shape="circle"
          icon={
            <Icon>
              <SearchOutlined />
            </Icon>
          }
        />
        <Button size={size()} type="primary" shape="circle">
          A
        </Button>
        <Button
          size={size()}
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
          size={size()}
          shape="circle"
          icon={
            <Icon>
              <SearchOutlined />
            </Icon>
          }
        />
        <Button shape="circle">A</Button>
        <Button
          size={size()}
          icon={
            <Icon>
              <SearchOutlined />
            </Icon>
          }
        >
          搜索
        </Button>
        <Button
          size={size()}
          type="dashed"
          shape="circle"
          icon={
            <Icon>
              <SearchOutlined />
            </Icon>
          }
        />
        <Button size={size()} type="dashed" shape="circle">
          A
        </Button>
        <Button
          size={size()}
          type="dashed"
          icon={
            <Icon>
              <SearchOutlined />
            </Icon>
          }
        >
          搜索
        </Button>
      </div>
    </ConfigProvider>
  )
}
