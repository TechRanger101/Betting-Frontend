import { createGlobalStyle } from 'styled-components'
import 'react-tooltip/dist/react-tooltip.css'
import { BACKGROUND_COLORS, FARE_COLORS, TEXT_COLORS } from './design/colors'
import { COMPONENTS } from './design/components'
import { BREAKPOINTS, SPACING } from './design/spacing'
import '@fontsource/roboto-mono'
import { FONT_STYLES, fontFacesCSS } from './design/fonts'
import { modalOverlayCSS, tooltipCSS } from './design/modules'

export const GlobalStyle = createGlobalStyle`
  body {
    ${fontFacesCSS};
    ${modalOverlayCSS};
    ${tooltipCSS};
    background-color: ${BACKGROUND_COLORS.one};
    color: ${TEXT_COLORS.one};
    margin: 0;
    
    * {
      // font-family: Roboto Mono, monospace;
      // font-family: PPSupply-Mono, monospace;
      font-family: Gohu, monospace;
      ${FONT_STYLES.sm};
    }

    /* For Firefox */
    * {
      scrollbar-width: none;
      -ms-overflow-style: none;
    }

    /* For Chrome, Edge, and Safari */
    *::-webkit-scrollbar {
      display: none;
    }
  }

  #root {
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }
`
export const RootWrapper = styled.div`
  display: grid;
  grid-template-rows: ${COMPONENTS.header}px calc(100vh - ${COMPONENTS.header}px);
  /* background: linear-gradient(0deg, #020404, rgba(10, 20, 30)); */
  background: linear-gradient(0deg, #000000, ${FARE_COLORS.black});
  background-blend-mode: darken;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`

export const AppWrapper = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr ${COMPONENTS.rightPanel + SPACING.md}px;
  grid-gap: ${SPACING.md}px;
  height: calc(100vh - ${COMPONENTS.header + SPACING.md * 2}px);

  @media only screen and (max-width: ${BREAKPOINTS.lg}px) {
    grid-template-columns: 0 1fr ${COMPONENTS.rightPanel - 40 + SPACING.md}px;
  }

  @media only screen and (max-width: ${BREAKPOINTS.md}px) {
    grid-template-columns: 0 1fr ${COMPONENTS.rightPanel - 60 + SPACING.md}px;
  }

  > * {
    margin: auto 0;
  }
`
