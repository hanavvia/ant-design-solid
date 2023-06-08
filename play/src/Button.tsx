import { Button, ConfigProvider, Icon } from '@ant-design-solid/component'
import { SearchOutlined } from '../../packages/icons'
import { createSignal } from 'solid-js'
import { ComponentSize } from '@ant-design-solid/shared'

export default () => {
  const [size, setSize] = createSignal<ComponentSize>('middle')
  return (
    <ConfigProvider>
      <div style={{ height: '100%', width: '100%', padding: '20px 20px' }}>
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
          <Button size={size()} shape="circle">
            A
          </Button>
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
        <h1>Shape</h1>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            shape="circle"
            icon={
              <Icon>
                <SearchOutlined />
              </Icon>
            }
          />
          <Button
            shape="round"
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
            type="primary"
            icon={
              <Icon>
                <SearchOutlined />
              </Icon>
            }
          />
          <Button
            shape="round"
            type="primary"
            icon={
              <Icon>
                <SearchOutlined />
              </Icon>
            }
          >
            搜索
          </Button>
        </div>
        <h1>Disabled</h1>
        <div
          style={{ display: 'flex', 'flex-direction': 'column', gap: '8px' }}
        >
          <div class="space">
            <Button type="primary">Primary</Button>
            <Button
              type="primary"
              disabled
              onClick={() => console.log('click')}
            >
              Disabled Primary
            </Button>
          </div>
          <div class="space">
            <Button>Primary</Button>
            <Button disabled onClick={() => console.log('click')}>
              Disabled Default
            </Button>
          </div>
          <div class="space">
            <Button type="dashed">Dashed</Button>
            <Button type="dashed" disabled>
              Disabled Disaled
            </Button>
          </div>
          <div>
            <Button type="text">Text</Button>
            <Button type="text" disabled>
              Text Disaled
            </Button>
          </div>
          <div>
            <Button type="link">Link</Button>
            <Button type="link" disabled>
              Link Disaled
            </Button>
          </div>
          <div class="space">
            <Button type="primary" href="https://ant.design/index-cn">
              Href Primary
            </Button>
            <Button type="primary" href="https://ant.design/index-cn" disabled>
              Href Primary(disabled)
            </Button>
          </div>
        </div>
        <h1>Danger</h1>
        <div class="space">
          <Button type="primary" danger>
            Primary
          </Button>
          <Button danger>Default</Button>
          <Button type="dashed" danger>
            Dashed
          </Button>
          <Button type="text" danger>
            Text
          </Button>
          <Button type="link" danger>
            Link
          </Button>
        </div>
        <h1>GHOST</h1>
        <div class="space">
          <Button type="primary" ghost>
            Primary
          </Button>
          <Button ghost>Default</Button>
          <Button type="dashed" ghost>
            Dashed
          </Button>
          <Button type="primary" danger ghost>
            Danger
          </Button>
        </div>
        <h1>Loading</h1>
        <div class="space">
          <Button type="primary" loading>
            Primary
          </Button>
          <Button loading>Default</Button>
        </div>
      </div>
    </ConfigProvider>
  )
}
