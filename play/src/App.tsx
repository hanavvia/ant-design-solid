import type { Component } from 'solid-js'

import logo from './logo.svg'
import styles from './App.module.css'
import { useToken } from '@ant-design-solid/theme'

const App: Component = () => {
  const token = useToken()
  console.log(token())
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <img src={logo} class={styles.logo} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          class={styles.link}
          href="https://github.com/solidjs/solid"
          target="_blank"
          style={{ color: 'var(--ant-color-red-9)' }}
          rel="noopener noreferrer"
        >
          Learn Solid
        </a>
      </header>
    </div>
  )
}

export default App
