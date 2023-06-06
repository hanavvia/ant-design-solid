import type { FontMapToken } from '../../interface'
import { numberToPxVal } from '../../util/sizeUnit'
import genFontSizes from './genFontSizes'

const genFontMapToken = (fontSize: number): FontMapToken => {
  const fontSizePairs = genFontSizes(fontSize)
  const fontSizes = fontSizePairs.map((pair) => pair.size)
  const lineHeights = fontSizePairs.map((pair) => pair.lineHeight)

  return {
    fontSizeSM: numberToPxVal(fontSizes[0]),
    fontSize: numberToPxVal(fontSizes[1]),
    fontSizeLG: numberToPxVal(fontSizes[2]),
    fontSizeXL: numberToPxVal(fontSizes[3]),

    fontSizeHeading1: numberToPxVal(fontSizes[6]),
    fontSizeHeading2: numberToPxVal(fontSizes[5]),
    fontSizeHeading3: numberToPxVal(fontSizes[4]),
    fontSizeHeading4: numberToPxVal(fontSizes[3]),
    fontSizeHeading5: numberToPxVal(fontSizes[2]),

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
