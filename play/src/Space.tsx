import { Space, Button, Divider } from 'ant-design-solid'

import './css/space.css'

export default () => {
  return (
    <div>
      <div>
        <Space>
          <Button>按钮</Button>
          <Button>按钮</Button>
          <Button>按钮</Button>
          <div>hello</div>
          <>
            <div>F1</div>
            <div>F2</div>
          </>
          <>
            <div>F3</div>
          </>
        </Space>
      </div>
      <div>
        <Space />
        <Space>纯文本</Space>
        <Space>
          <div>一个</div>
        </Space>
        <Space>
          <Button>Button</Button>
        </Space>
        <Space>
          <>
            <div>F</div>
            <div>FF</div>
          </>
        </Space>
      </div>
      <div>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <Button size="small">content</Button>
          <Button size="small">content</Button>
          <Button size="small">content</Button>
        </Space>
      </div>
      <div class="space-align-container">
        <div class="space-align-block">
          <Space align="center">
            center
            <Button type="primary">Primary</Button>
            <span class="mock-block">Block</span>
          </Space>
        </div>
        <div class="space-align-block">
          <Space align="start">
            start
            <Button type="primary">Primary</Button>
            <span class="mock-block">Block</span>
          </Space>
        </div>
        <div class="space-align-block">
          <Space align="end">
            end
            <Button type="primary">Primary</Button>
            <span class="mock-block">Block</span>
          </Space>
        </div>
        <div class="space-align-block">
          <Space align="baseline">
            baseline
            <Button type="primary">Primary</Button>
            <span class="mock-block">Block</span>
          </Space>
        </div>
      </div>
      <h1>分隔符</h1>
      <div>
        <Space split={<Divider type="vertical" />}>
          <Button>Link</Button>
          <Button>Link</Button>
          <Button>Link</Button>
        </Space>
      </div>
    </div>
  )
}
