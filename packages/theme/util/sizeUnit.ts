export const pxToNumber = (pxVal: string) => {
  return parseInt(pxVal.replace('px', ''))
}

export const numberToPxVal = (numberVal: number) => {
  return `${numberVal}px`
}
