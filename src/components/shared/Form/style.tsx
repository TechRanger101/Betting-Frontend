import { motion } from 'framer-motion'
import {
  floatingContainer,
  FONT_STYLES,
  SPACING,
  BORDER_COLORS,
  TEXT_COLORS,
  FARE_COLORS,
  COLORS,
  COMPONENTS,
  BACKGROUND_COLORS,
} from '@/design'
import { ModeButton } from '../Button/style'

export const Form = styled.div`
  display: flex;
  align-self: stretch;
  flex-direction: column;
  border-radius: 6px;
  position: relative;
  user-select: none;
  overflow: scroll;
  max-height: 100%;
  max-width: 315.6px;
  position: relative;
  ${floatingContainer}

  input[inputmode="numeric"] {
    ${FONT_STYLES.sm}
    padding-right: 70px;
  }

  .rc-slider {
    width: calc(100% - 24px);
    margin-left: auto;
    margin-right: auto;
    margin-top: ${SPACING.md}px;
    margin-bottom: 8px;
  }
  .rc-slider-mark-text {
    height: 0px;
    width: 0px;
    display: none;
  }

  .rc-slider-mark-text-active {
    height: 0px;
    width: 0px;
    display: none;
  }

  .rc-slider-rail {
    background: rgba(255, 255, 255, 0.15);
  }

  .rc-slider-track {
    background: #0f6fff;
  }

  .rc-slider-handle-dragging.rc-slider-handle-dragging.rc-slider-handle-dragging {
    border-color: #27ff83;
    background: #27ff83;
    box-shadow: 0px 0px 16px #53ff0f;
    position: relative;
  }

  .rc-slider-handle-dragging::before {
    content: '';
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    z-index: -1;
    background-color: #27ff83;
    opacity: 0.5;
    border-radius: 50%;
  }

  .rc-slider-dot {
    background: transparent;
    border: none;
    height: 6px;
    width: 6px;
    bottom: 0px;
    height: 4px;
    width: 2px;
    border-radius: 0px;
    &:first-of-type {
      height: 0px;
      width: 0px;
      border: none;
    }
    &:last-of-type {
      height: 10px;
      width: 10px;
      bottom: -3px;
      border-radius: 100px;
      background: #0f6fff;
      border: 1px solid #0f6fff;
    }
  }

  .rc-slider-dot-active {
    display: none;
  }

  .rc-slider-handle {
    border-color: #27ff83;
    background: #27ff83;
  }
`

export const FormTab = styled.div<{ tabs?: number }>`
  display: grid;
  grid-template-columns: repeat(${({ tabs }) => tabs ?? 1}, 1fr);
  grid-template-rows: 1fr;
  border-bottom: 1px solid ${BORDER_COLORS.one};
  margin: 0;
  background: ${BACKGROUND_COLORS.two};
  position: sticky;
  top: 0;
  z-index: 100;

  ${({ tabs }) => `
    @for $i from 1 through ${tabs ?? 1} {
      &:nth-child(#{$i}) {
        grid-column: $i / span 1;
      }
    }
  `}

  > ${ModeButton} {
    height: ${COMPONENTS.tabs}px;
    text-transform: uppercase;
    margin: ${SPACING.xxs}px;
    border: none;

    &:first-of-type {
      margin-right: 0;
    }

    &:last-of-type {
      margin-left: 0;
    }

    &:not(:last-of-type) {
      border-right: 1px solid ${BORDER_COLORS.one};
    }
  }

  > * {
    grid-column: span 1;
  }
`

export const FormSection = styled.div`
  padding: ${SPACING.md}px;
  position: relative;
  transition: 0.2s all ease-in-out;
  box-sizing: border-box;
  border-bottom: 1px solid ${BORDER_COLORS.one};
  padding-left: ${SPACING.lg}px;
  display: flex;
  flex-direction: column;

  &.stretch-content {
    flex: 1;
  }

  &:not(.notActive):hover {
    > * {
      transition: 0.2s all ease-in-out;
      color: ${TEXT_COLORS.one};
    }

    &:first-of-type {
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
    }
  }

  // ACTIVE BET SECTION
  &:nth-of-type(4) {
    padding-left: ${SPACING.md}px;
  }

  &.content-scroll {
    overflow-y: scroll;
    padding: 0px;
  }

  &.sm-pd-bottom {
    padding-bottom: ${SPACING.xs}px;
  }
`

export const FormLabel = styled.div`
  color: ${TEXT_COLORS.two};
  margin-bottom: ${SPACING.xs}px;
  ${FONT_STYLES.xs}

  p {
    color: ${TEXT_COLORS.three};
  }
  .queued-title-wrapper {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`

export const FormIndicator = styled.span<{ isActive?: boolean }>`
  display: inline-block;
  height: 4px;
  width: 4px;
  border-radius: 1px;
  margin: auto;
  position: absolute;
  left: ${SPACING.sm}px;
  top: 20px;
  transition: 0.2s all ease-in-out;
  ${({ isActive }) =>
    isActive
      ? css`
          border: 1px solid ${FARE_COLORS.aqua};
          box-shadow: inset 0px 0px 10px ${FARE_COLORS.aqua}99;
        `
      : css`
          border: 1px solid #ffffff1c;
          background: #27292b99;
        `}
`

export const FormFooter = styled.div`
  padding: ${SPACING.xs}px;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: black;
  border-top: 1px solid ${BORDER_COLORS.one};
  display: flex;
  flex-direction: column;
  justify-content: center;

  > .form-footer-mt-sm {
    margin-bottom: ${SPACING.sm}px;
  }

  &:hover {
    ${FormIndicator} {
      border: 1px solid rgba(255, 255, 255, 0.5);
    }
  }

  button {
    width: 100%;
  }
`

export const FormLabelRow = styled.div`
  display: flex;
  justify-content: space-between;

  > ${FormLabel} {
    margin-bottom: ${SPACING.xs}px;
  }
`

export const FormAmountLabel = styled.div`
  display: flex;
  justify-content: space-between;
  &.is-negative {
    color: ${COLORS.error};
  }
`

export const MotionFormSection = styled(motion.div)`
  padding: ${SPACING.md}px;
  position: relative;
  transition: 0.2s all ease-in-out;
  box-sizing: border-box;
  border-bottom: 1px solid ${BORDER_COLORS.one};
  padding-left: ${SPACING.lg}px;
  padding-bottom: ${SPACING.xs}px;
  display: flex;
  flex-direction: column;

  &.stretch-content {
    flex: 1;
  }

  &:not(.notActive):hover {
    > * {
      transition: 0.2s all ease-in-out;
      color: ${TEXT_COLORS.one};
    }

    &:first-of-type {
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
    }
  }

  &.content-scroll {
    overflow-y: scroll;
    padding: 0px;
  }

  &.sm-pd-bottom {
    padding-bottom: ${SPACING.xs}px;
  }
`
