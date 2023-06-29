import type { SeedToken, SizeMapToken } from '../../interface'
import { toPx, pxToNumber } from '../../util/sizeUnit'

export default function genSizeMapToken(token: SeedToken): SizeMapToken {
  const { sizeUnit, sizeStep } = token

  const compactSizeStep = pxToNumber(sizeStep) - 2
  const sizeUnitNumber = pxToNumber(sizeUnit)
  return {
    sizeXXL: toPx(sizeUnitNumber * (compactSizeStep + 10)),
    sizeXL: toPx(sizeUnitNumber * (compactSizeStep + 6)),
    sizeLG: toPx(sizeUnitNumber * (compactSizeStep + 2)),
    sizeMD: toPx(sizeUnitNumber * (compactSizeStep + 2)),
    sizeMS: toPx(sizeUnitNumber * (compactSizeStep + 1)),
    size: toPx(sizeUnitNumber * compactSizeStep),
    sizeSM: toPx(sizeUnitNumber * compactSizeStep),
    sizeXS: toPx(sizeUnitNumber * (compactSizeStep - 1)),
    sizeXXS: toPx(sizeUnitNumber * (compactSizeStep - 1))
  }
}
