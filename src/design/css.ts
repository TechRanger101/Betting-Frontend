import { BORDER_COLORS } from './colors'

export const floatingContainer = css`
  border: 1px solid ${BORDER_COLORS.one};
  backdrop-filter: blur(4px);
`

export const fade = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`
