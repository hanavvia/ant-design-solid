import type { FontMapToken } from '../../interface'
import { toPx } from '../../util/sizeUnit'
import genFontSizes from './genFontSizes'

const genFontMapToken = (fontSize: number): FontMapToken => {
  const fontSizePairs = genFontSizes(fontSize)
  const fontSizes = fontSizePairs.map((pair) => pair.size)
  const lineHeights = fontSizePairs.map((pair) => pair.lineHeight)

  return {
    fontSizeSM: toPx(fontSizes[0]),
    fontSize: toPx(fontSizes[1]),
    fontSizeLG: toPx(fontSizes[2]),
    fontSizeXL: toPx(fontSizes[3]),

    fontSizeHeading1: toPx(fontSizes[6]),
    fontSizeHeading2: toPx(fontSizes[5]),
    fontSizeHeading3: toPx(fontSizes[4]),
    fontSizeHeading4: toPx(fontSizes[3]),
    fontSizeHeading5: toPx(fontSizes[2]),

    lineHeight: lineHeights[1],
    lineHeightLG: lineHeights[2],
    lineHeightSM: lineHeights[0],

    lineHeightHeading1: lineHeights[6],
    lineHeightHeading2: lineHeights[5],
    lineHeightHeading3: lineHeights[4],
    lineHeightHeading4: lineHeights[3],
    lineHeightHeading5: lineHeights[2]
  }
}

export default genFontMapToken
