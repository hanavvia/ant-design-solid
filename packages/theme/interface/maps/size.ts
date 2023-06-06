export interface SizeMapToken {
  /**
   * @nameZH XXL
   * @default 48
   */
  sizeXXL: string
  /**
   * @nameZH XL
   * @default 32
   */
  sizeXL: string
  /**
   * @nameZH LG
   * @default 24
   */
  sizeLG: string
  /**
   * @nameZH MD
   * @default 20
   */
  sizeMD: string
  /** Same as size by default, but could be larger in compact mode */
  sizeMS: string
  /**
   * @nameZH 默认
   * @desc 默认尺寸
   * @default 16
   */
  size: string
  /**
   * @nameZH SM
   * @default 12
   */
  sizeSM: string
  /**
   * @nameZH XS
   * @default 8
   */
  sizeXS: string
  /**
   * @nameZH XXS
   * @default 4
   */
  sizeXXS: string
}

export interface HeightMapToken {
  // Control
  /** Only Used for control inside component like Multiple Select inner selection item */

  /**
   * @nameZH 更小的组件高度
   * @nameEN XS component height
   * @desc 更小的组件高度
   * @descEN XS component height
   */
  controlHeightXS: number

  /**
   * @nameZH 较小的组件高度
   * @nameEN SM component height
   * @desc 较小的组件高度
   * @descEN SM component height
   */
  controlHeightSM: number

  /**
   * @nameZH 较高的组件高度
   * @nameEN LG component height
   * @desc 较高的组件高度
   * @descEN LG component height
   */
  controlHeightLG: number
}
