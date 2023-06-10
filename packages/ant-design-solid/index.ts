import { GlobalConfig, setGlobaConfigEntirely } from '@ant-design-solid/hooks'

export * from '@ant-design-solid/component'

export default {
  // TODO theme initialize
  setup(config?: GlobalConfig) {
    setGlobaConfigEntirely(config)
  }
}
