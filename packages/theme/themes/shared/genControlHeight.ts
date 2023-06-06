import type { HeightMapToken, SeedToken } from '../../interface'
import { pxToNumber } from '../../util/sizeUnit'

const genControlHeight = (token: SeedToken): HeightMapToken => {
  const { controlHeight } = token
  const numberVal = pxToNumber(controlHeight)
  return {
    controlHeightSM: numberVal * 0.75,
    controlHeightXS: numberVal * 0.5,
    controlHeightLG: numberVal * 1.25
  }
}

export default genControlHeight
