import { JSX, children, useContext } from 'solid-js'
import { SpaceContext } from './Space'

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
        if (props.index < context.latestIndex) {
          result = {
            'margin-bottom': `${
              context.horizontalSize / (props.split ? 2 : 1)
            }px`
          }
        }
      } else {
        result = {
          ...(props.index < context.latestIndex && {
            [props.marginDirection]:
              context.horizontalSize / (props.split ? 2 : 1)
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

  return (
    <>
      <div style={style()} class={props.className}>
        {children(() => props.children)()}
      </div>
      {props.index < context.latestIndex && props.split && (
        <span class={`${props.className}-split`} style={style()}>
          {props.split}
        </span>
      )}
    </>
  )
}
