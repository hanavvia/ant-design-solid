export const camelToStrike = (str: string) => {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase()
}
