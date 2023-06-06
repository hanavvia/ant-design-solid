import type { SeedToken, SizeMapToken } from '../../interface'
import { numberToPxVal, pxToNumber } from '../../util/sizeUnit'

export default function genSizeMapToken(token: SeedToken): SizeMapToken {
  const { sizeUnit, sizeStep } = token

  const compactSizeStep = pxToNumber(sizeStep) - 2
  const sizeUnitNumber = pxToNumber(sizeUnit)
  return {
    sizeXXL: numberToPxVal(sizeUnitNumber * (compactSizeStep + 10)),
    sizeXL: numberToPxVal(sizeUnitNumber * (compactSizeStep + 6)),
    sizeLG: numberToPxVal(sizeUnitNumber * (compactSizeStep + 2)),
    sizeMD: numberToPxVal(sizeUnitNumber * (compactSizeStep + 2)),
    sizeMS: numberToPxVal(sizeUnitNumber * (compactSizeStep + 1)),
    size: numberToPxVal(sizeUnitNumber * compactSizeStep),
    sizeSM: numberToPxVal(sizeUnitNumber * compactSizeStep),
    sizeXS: numberToPxVal(sizeUnitNumber * (compactSizeStep - 1)),
    sizeXXS: numberToPxVal(sizeUnitNumber * (compactSizeStep - 1))
  }
}
