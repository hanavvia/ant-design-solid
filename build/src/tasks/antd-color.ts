import { resolve } from 'path'
import { writeFile } from 'fs'
import {
  red,
  volcano,
  orange,
  gold,
  yellow,
  lime,
  green,
  cyan,
  blue,
  geekblue,
  purple,
  magenta,
  grey,
  gray
} from '@ant-design/colors'

import theme from '@ant-design-solid/theme'

import { camelToStrike, keysOf } from '@ant-design-solid/shared'
import { PKG_THEME_CHALK } from '../paths'
import { camelCase } from 'lodash-es'

type Color = string[] & {
  primary?: string | undefined
}

const colors = {
  red,
  volcano,
  orange,
  gold,
  yellow,
  lime,
  green,
  cyan,
  blue,
  geekblue,
  purple,
  magenta,
  grey,
  gray
}

export const colorPrimaries = {
  red: red.primary,
  volcano: volcano.primary,
  orange: orange.primary,
  gold: gold.primary,
  yellow: yellow.primary,
  lime: lime.primary,
  green: green.primary,
  cyan: cyan.primary,
  blue: blue.primary,
  geekblue: geekblue.primary,
  purple: purple.primary,
  magenta: magenta.primary,
  grey: grey.primary,
  gray: gray.primary
}

const colorCssVars = (key: keyof typeof colors, color: Color): string => {
  const lines: string[] = []
  lines.push(`  --ant-color-${camelToStrike(key)}-primary: ${color.primary};`)
  color.forEach((val, index) => {
    lines.push(`  --ant-color-${camelToStrike(key)}-${index + 1}: ${val};`)
  })
  return lines.join('\n')
}

const antdCssVarGenerator = () => {
  const tokens = theme.defaultAlgorithm(theme.defaultSeed)
  const cssVars: string[] = []
  keysOf(tokens).forEach((key) => {
    cssVars.push(`  --ant-${camelToStrike(camelCase(key))}: ${tokens[key]}`)
  })
  return cssVars.join(';\n')
}

export const generateAntdColorVar = async () => {
  const antdColorCssVars: string[] = []
  keysOf(colors).forEach((key) => {
    const color = colors[key]
    antdColorCssVars.push(colorCssVars(key, color))
  })
  //   const sassContent = `
  // :root {
  // ${antdColorCssVars.join('\n')}
  // }
  //   `
  const sassContent = `
:root {
${antdCssVarGenerator()}
}
  `
  await writeFile(
    resolve(__dirname, PKG_THEME_CHALK, 'src/antd/color-css-var.scss'),
    sassContent,
    {},
    (error) => {
      console.log(error)
    }
  )
}
