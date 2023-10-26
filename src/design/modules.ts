export const modalOverlayCSS = css`
  .ReactModal__Overlay {
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }

  .ReactModal__Overlay--after-open {
    opacity: 1;
  }

  .ReactModal__Overlay--before-close {
    opacity: 0;
  }
`

export const tooltipCSS = css`
  .react-tooltip {
    z-index: 1000 !important;
  }
`
