export const pxToNumber = (pxVal: string) => {
  return parseInt(pxVal.replace('px', ''))
}

export const toPx = (numberVal?: number) => {
  return numberVal ? `${numberVal}px` : '0px'
}
