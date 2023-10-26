import '@fontsource/roboto-mono'

export const fontFacesCSS = css`
  // @font-face {
  //   font-family: 'PPSupply-Mono';
  //   src: url('/fonts/PPSupply/PPSupplyMono-Regular.otf') format('opentype');
  // }

  // @font-face {
  //   font-family: 'Gohu-14-Mono';
  //   src: url('/fonts/Gohu/uni-14/Gohu-Mono-Medium.ttf') format('truetype');
  // }

  // @font-face {
  //   font-family: 'Gohu-14';
  //   src: url('/fonts/Gohu/uni-14/Gohu-Medium.ttf') format('truetype');
  // }

  /* @font-face { */
  /*   font-family: 'Gohu'; */
  /*   src: url('/fonts/Gohu/small-uni-14/gohu-small-uni-14.ttf') format('truetype'); */
  /* } */

  /* @font-face { */
  /*   font-family: 'Gohu'; */
  /*   src: url('/fonts/Gohu/small-uni-11/gohu-small-uni-11.ttf') format('truetype'); */
  /* } */

  @font-face {
    font-family: 'Gohu';
    src: url('/fonts/Gohu/GohuFontNerdFontComplete-14-FP.ttf') format('truetype');
  }

  @font-face {
    font-family: 'Gohu';
    src: url('/fonts/Gohu/GohuFontNerdFontComplete-14-FP.ttf') format('truetype');
  }
`

export const FONT_STYLES = {
  xs: css`
    font-size: 11px;
    line-height: 12px;
  `,
  // In the root style, everything within body uses FONT_STYLES.sm by default
  sm: css`
    font-size: 12px;
    line-height: 16px;
  `,
  md: css`
    font-size: 14px;
    line-height: 16px;
  `,
  lg: css`
    font-size: 18px;
    line-height: 16px;
  `,
  xl: css``,
  xxl: css`
    font-size: 48px;
    line-height: 36px;
  `,
}
