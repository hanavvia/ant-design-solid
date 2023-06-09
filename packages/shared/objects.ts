export const keysOf = <T extends object>(arr: T) =>
  Object.keys(arr) as Array<keyof T>
