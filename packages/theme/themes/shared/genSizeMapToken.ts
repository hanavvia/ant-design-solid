import type { SeedToken, SizeMapToken } from '../../interface'
import { toPx, pxToNumber } from '../../util/sizeUnit'

export default function genSizeMapToken(token: SeedToken): SizeMapToken {
  const { sizeUnit, sizeStep } = token
  const unitNumber = pxToNumber(sizeUnit)
  const stepNumber = pxToNumber(sizeStep)
  return {
    sizeXXL: toPx(unitNumber * (stepNumber + 8)), // 48
    sizeXL: toPx(unitNumber * (stepNumber + 4)), // 32
    sizeLG: toPx(unitNumber * (stepNumber + 2)), // 24
    sizeMD: toPx(unitNumber * (stepNumber + 1)), // 20
    sizeMS: toPx(unitNumber * stepNumber), // 16
    size: toPx(unitNumber * stepNumber), // 16
    sizeSM: toPx(unitNumber * (stepNumber - 1)), // 12
    sizeXS: toPx(unitNumber * (stepNumber - 2)), // 8
    sizeXXS: toPx(unitNumber * (stepNumber - 3)) // 4
  }
}
