import { NAMESPACE } from '@ant-design-solid/shared'
import { useGlobalConfig } from './use-global-config'

const statePrefix = 'is-'

const _bem = (
  namespace: string,
  block: string,
  blockSuffix: string,
  element: string,
  modifier: string
) => {
  let cls = `${namespace}-${block}`
  if (blockSuffix) {
    cls += `-${blockSuffix}`
  }
  if (element) {
    cls += `__${element}`
  }
  if (modifier) {
    cls += `--${modifier}`
  }
  return cls
}

export const useNamespace = (block: string) => {
  const namespace = useGlobalConfig('namespace')
  const b = (blockSuffix = '') =>
    _bem(namespace() || NAMESPACE, block, blockSuffix, '', '')
  const e = (element?: string) =>
    element ? _bem(namespace() || NAMESPACE, block, '', element, '') : ''
  const m = (modifier?: string) =>
    modifier ? _bem(namespace() || NAMESPACE, block, '', '', modifier) : ''
  const be = (blockSuffix?: string, element?: string) =>
    blockSuffix && element
      ? _bem(namespace() || NAMESPACE, block, blockSuffix, element, '')
      : ''
  const em = (element?: string, modifier?: string) =>
    element && modifier
      ? _bem(namespace() || NAMESPACE, block, '', element, modifier)
      : ''
  const bm = (blockSuffix?: string, modifier?: string) =>
    blockSuffix && modifier
      ? _bem(namespace() || NAMESPACE, block, blockSuffix, '', modifier)
      : ''
  const bem = (blockSuffix?: string, element?: string, modifier?: string) =>
    blockSuffix && element && modifier
      ? _bem(namespace() || NAMESPACE, block, blockSuffix, element, modifier)
      : ''
  const is: {
    (name: string, state: boolean | undefined): string
    (name: string): string
  } = (name: string, ...args: [boolean | undefined] | []) => {
    const state = args.length >= 1 ? args[0]! : true
    return name && state ? `${statePrefix}${name}` : ''
  }

  // for css var
  // --ant-xxx: value;
  const cssVar = (object: Record<string, string>) => {
    const styles: Record<string, string> = {}
    for (const key in object) {
      if (object[key]) {
        styles[`--${namespace() || NAMESPACE}-${key}`] = object[key]
      }
    }
    return styles
  }
  // with block
  const cssVarBlock = (object: Record<string, string>) => {
    const styles: Record<string, string> = {}
    for (const key in object) {
      if (object[key]) {
        styles[`--${namespace() || NAMESPACE}-${block}-${key}`] = object[key]
      }
    }
    return styles
  }

  const cssVarName = (name: string) => `--${namespace() || NAMESPACE}-${name}`
  const cssVarBlockName = (name: string) =>
    `--${namespace() || NAMESPACE}-${block}-${name}`

  return {
    namespace,
    b,
    e,
    m,
    be,
    em,
    bm,
    bem,
    is,
    // css
    cssVar,
    cssVarName,
    cssVarBlock,
    cssVarBlockName
  }
}

export type UseNamespaceReturn = ReturnType<typeof useNamespace>
