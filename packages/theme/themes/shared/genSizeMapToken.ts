import type { SeedToken, SizeMapToken } from '../../interface'
import { numberToPxVal, pxToNumber } from '../../util/sizeUnit'

export default function genSizeMapToken(token: SeedToken): SizeMapToken {
  const { sizeUnit, sizeStep } = token
  const unitNumber = pxToNumber(sizeUnit)
  const stepNumber = pxToNumber(sizeStep)
  return {
    sizeXXL: numberToPxVal(unitNumber * (stepNumber + 8)), // 48
    sizeXL: numberToPxVal(unitNumber * (stepNumber + 4)), // 32
    sizeLG: numberToPxVal(unitNumber * (stepNumber + 2)), // 24
    sizeMD: numberToPxVal(unitNumber * (stepNumber + 1)), // 20
    sizeMS: numberToPxVal(unitNumber * stepNumber), // 16
    size: numberToPxVal(unitNumber * stepNumber), // 16
    sizeSM: numberToPxVal(unitNumber * (stepNumber - 1)), // 12
    sizeXS: numberToPxVal(unitNumber * (stepNumber - 2)), // 8
    sizeXXS: numberToPxVal(unitNumber * (stepNumber - 3)) // 4
  }
}
