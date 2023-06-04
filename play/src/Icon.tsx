import { Icon, ConfigProvider } from '@ant-design-solid/component'
import { SearchOutlined } from '@ant-design-solid/icons'

export default () => {
  return (
    <ConfigProvider>
      <div style={{ display: 'inline-flex', gap: '8px' }}>
        <Icon>
          <SearchOutlined />
        </Icon>
      </div>
    </ConfigProvider>
  )
}
