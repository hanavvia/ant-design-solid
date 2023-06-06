/* @refresh reload */
import { render } from 'solid-js/web'

import './index.css'
import './space.css'
import '@ant-design-solid/theme-chalk/src/index.scss'
import AntDesignSolid from 'ant-design-solid'
;(async () => {
  AntDesignSolid.setup()
  const root = document.getElementById('root')
  if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
    throw new Error(
      'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?'
    )
  }
  const apps = import.meta.glob('./*.tsx')
  const name = location.pathname.replace(/^\//, '') || 'App'
  const file = apps[`./${name}.tsx`]
  if (!file) {
    location.pathname = 'App'
    return
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const App = ((await file()) as any).default
  if (root) {
    render(() => <App />, root)
  }
})()
