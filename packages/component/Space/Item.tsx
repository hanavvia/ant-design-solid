import { JSX, children, createEffect, useContext } from 'solid-js'
import { SpaceContext } from './Space'
import { toValue } from '@ant-design-solid/shared'

export interface ItemProps {
  className: string
  children: JSX.Element
  index: number
  direction?: 'horizontal' | 'vertical'
  marginDirection: 'marginLeft' | 'marginRight'
  split?: JSX.Element
  wrap?: boolean
}

export default (props: ItemProps) => {
  const context = useContext(SpaceContext)

  const style = () => {
    let result: JSX.CSSProperties = {}

    if (!context.supportFlexGap) {
      if (props.direction === 'vertical') {
        if (props.index < toValue(context.latestIndex)) {
          result = {
            'margin-bottom': `${
              toValue(context.horizontalSize) / (props.split ? 2 : 1)
            }px`
          }
        }
      } else {
        result = {
          ...(props.index < toValue(context.latestIndex) && {
            [props.marginDirection]:
              toValue(context.horizontalSize) / (props.split ? 2 : 1)
          }),
          ...(props.wrap && { paddingBottom: context.verticalSize })
        }
      }
    }
    return result
  }

  if (props.children === null || props.children === undefined) {
    return null
  }

  createEffect(() => {
    if (props.split) {
      console.log(toValue(context.latestIndex))
    }
  })

  const split = () =>
    props.index < toValue(context.latestIndex) &&
    props.split && (
      <span class={`${props.className}-split`} style={style()}>
        {props.split}
      </span>
    )

  if (props.split) {
    console.log('props.index', props.index)
    console.log('context.latestIndex', toValue(context.latestIndex))
    console.log(props.index < toValue(context.latestIndex) && props.split)
  }

  return (
    <>
      <div style={style()} class={props.className}>
        {children(() => props.children)()}
      </div>
      {split()}
    </>
  )
}
