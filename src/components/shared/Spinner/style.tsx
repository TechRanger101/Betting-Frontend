import { type ToastModes, type GameModes } from '.'
import { BORDER_COLORS, COLORS, FARE_COLORS } from '@/design/colors'

const blockFlash = (color?: string) => keyframes`
  0% {
    border-color: ${BORDER_COLORS.one};
  }

  50% {
    border-color: ${color};
  }

  100% {
    border-color: ${BORDER_COLORS.one};
  }
`

const blockFlashToast = (color?: string) => keyframes`
  0% {
    border-color: ${color};
  }

  50% {
    border-color: ${BORDER_COLORS.one};
  }

  100% {
    border-color: ${color};
  }
`

const delayedBlockFlash = (color?: string) => keyframes`
  0% {
    border-color: ${BORDER_COLORS.one};
  }

  15% {
    border-color: ${color};
  }

  30% {
    border-color: ${BORDER_COLORS.one};
  }

  45% {
    border-color: ${color};
  }

  100% {
    border-color: ${BORDER_COLORS.one};
  }
`

export const SpinnerWrapper = styled.div<{ gap?: number }>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: ${({ gap }) => gap ?? 2}px;
`

export const Block = styled.span<{
  mode: GameModes
  size?: number
}>`
  display: block;
  width: ${({ size }) => size ?? 4}px;
  height: ${({ size }) => size ?? 4}px;
  border-radius: 2px;
  border: 1px solid ${BORDER_COLORS.one};

  &:first-of-type {
    ${({ mode }) => {
      if (mode === 'win') {
        return
      }

      if (mode === 'lose') {
        return css`
          animation: 2s ${delayedBlockFlash(COLORS.error)} infinite;
          animation-delay: 0s;
        `
      }

      if (mode === 'spin') {
        return css`
          animation: 1s ${blockFlash(FARE_COLORS.blue)} infinite;
          animation-delay: 0s;
        `
      }

      if (mode === 'dice') {
        return css`
          animation: 2s ${blockFlash(FARE_COLORS.blue)} infinite;
          animation-delay: 0s;
        `
      }

      // Default blocks
      return css`
        animation: 1s ${blockFlash(FARE_COLORS.pink)} infinite;
        animation-delay: 0s;
      `
    }}
  }

  &:nth-of-type(2) {
    ${({ mode }) => {
      if (mode === 'win') {
        return css`
          animation: 2s ${delayedBlockFlash(COLORS.success)} infinite;
          animation-delay: 0.2s;
        `
      }

      if (mode === 'lose') {
        return
      }

      if (mode === 'spin') {
        return css`
          animation: 1s ${blockFlash(FARE_COLORS.blue)} infinite;
          animation-delay: 0.25s;
        `
      }

      if (mode === 'dice') {
        return css`
          animation: 2s ${blockFlash('#ccc')} infinite;
          animation-delay: 1s;
        `
      }

      // Default blocks
      return css`
        animation: 1s ${blockFlash(FARE_COLORS.salmon)} infinite;
        animation-delay: 0.25s;
      `
    }}
  }

  &:nth-of-type(3) {
    ${({ mode }) => {
      if (mode === 'win') {
        return css`
          animation: 2s ${delayedBlockFlash(COLORS.success)} infinite;
          animation-delay: 0s;
        `
      }

      if (mode === 'lose') {
        return
      }

      if (mode === 'spin') {
        return css`
          animation: 1s ${blockFlash(FARE_COLORS.blue)} infinite;
          animation-delay: 0.75s;
        `
      }

      if (mode === 'dice') {
        return css`
          animation: 2s ${blockFlash('#ccc')} infinite;
          animation-delay: 1s;
        `
      }

      // Default blocks
      return css`
        animation: 1s ${blockFlash(FARE_COLORS.peach)} infinite;
        animation-delay: 0.75s;
      `
    }}
  }

  &:last-of-type {
    ${({ mode }) => {
      if (mode === 'win') {
        return
      }

      if (mode === 'lose') {
        return css`
          animation: 2s ${delayedBlockFlash(COLORS.error)} infinite;
          animation-delay: 0.2s;
        `
      }

      if (mode === 'spin') {
        return css`
          animation: 1s ${blockFlash(FARE_COLORS.blue)} infinite;
          animation-delay: 0.5s;
        `
      }

      if (mode === 'dice') {
        return css`
          animation: 2s ${blockFlash(FARE_COLORS.blue)} infinite;
          animation-delay: 0s;
        `
      }

      // Default blocks
      return css`
        animation: 1s ${blockFlash(FARE_COLORS.blue)} infinite;
        animation-delay: 0.5s;
      `
    }}
  }
`

export const ToastBlock = styled.span<{
  mode: ToastModes
  size?: number
}>`
  display: block;
  width: ${({ size }) => size ?? 4}px;
  height: ${({ size }) => size ?? 4}px;
  border-radius: 2px;
  border: 1px solid ${BORDER_COLORS.one};
  animation-fill-mode: forwards;

  &:first-of-type {
    ${({ mode }) => {
      if (mode === 'success') {
        return css`
          border-color: ${COLORS.success};
          animation: 2s ${blockFlashToast(COLORS.success)};
          animation-delay: 0s;
        `
      }

      if (mode === 'error') {
        return css`
          border-color: ${COLORS.error};
          animation: 2s ${blockFlashToast(COLORS.error)};
          animation-delay: 0s;
        `
      }

      // Default blocks
      return css`
        animation: 1s ${blockFlashToast(FARE_COLORS.pink)};
        animation-delay: 0s;
      `
    }}
  }

  &:nth-of-type(2) {
    ${({ mode }) => {
      if (mode === 'success') {
        return css`
          border-color: ${COLORS.success};
          animation: 2s ${blockFlashToast(COLORS.success)};
          animation-delay: 0s;
        `
      }

      if (mode === 'error') {
        return css`
          border-color: ${COLORS.error};
          animation: 2s ${blockFlashToast(COLORS.error)};
          animation-delay: 0s;
        `
      }

      // Default blocks
      return css`
        animation: 1s ${blockFlashToast(FARE_COLORS.salmon)};
        animation-delay: 0.25s;
      `
    }}
  }

  &:nth-of-type(3) {
    ${({ mode }) => {
      if (mode === 'success') {
        return css`
          border-color: ${COLORS.success};
          animation: 2s ${blockFlashToast(COLORS.success)};
          animation-delay: 0s;
        `
      }

      if (mode === 'error') {
        return css`
          border-color: ${COLORS.error};
          animation: 2s ${blockFlashToast(COLORS.error)};
          animation-delay: 0s;
        `
      }

      // Default blocks
      return css`
        animation: 1s ${blockFlashToast(FARE_COLORS.peach)};
        animation-delay: 0.75s;
      `
    }}
  }

  &:last-of-type {
    ${({ mode }) => {
      if (mode === 'success') {
        return css`
          border-color: ${COLORS.success};
          animation: 2s ${blockFlashToast(COLORS.success)};
          animation-delay: 0s;
        `
      }

      if (mode === 'error') {
        return css`
          border-color: ${COLORS.error};
          animation: 2s ${blockFlashToast(COLORS.error)};
          animation-delay: 0s;
        `
      }

      // Default blocks
      return css`
        animation: 1s ${blockFlashToast(FARE_COLORS.blue)};
        animation-delay: 0.5s;
      `
    }}
  }
`
