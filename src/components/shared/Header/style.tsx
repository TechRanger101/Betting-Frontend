import { motion } from 'framer-motion'
import Select from 'react-dropdown-select'
import { BACKGROUND_COLORS, BORDER_COLORS, FARE_COLORS } from '@/design/colors'
import { FONT_STYLES } from '@/design'
import { SPACING } from '../../../design/spacing'
import { COMPONENTS } from '../../../design/components'
import { AvatarWrapper } from '../Avatar/style'

export const HeaderWrapper = styled.div`
  position: relative;
  z-index: 100;
`

export const MainHeader = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #00000050;
  padding: 0 ${SPACING.md}px;
  height: ${COMPONENTS.header}px;
  backdrop-filter: blur(8px);

  > * {
    margin: auto 0;
  }

  ${AvatarWrapper} {
    width: 32px !important;
    height: 32px !important;

    > img {
      height: 20px !important;
      width: 20px !important;
    }
  }
`

export const SubHeader = styled.div`
  display: block;
`

export const LeftHeader = styled.div`
  display: flex;

  > img {
    margin: auto 0;
    height: 16px;
    padding-left: ${SPACING.xxs}px;
  }
`

export const RightHeader = styled.div`
  cursor: pointer;
  display: flex;

  img {
    height: ${SPACING.lg}px;
    width: ${SPACING.lg}px;
  }
`

export const AccountWrapper = styled.div`
  display: flex;

  > * {
    margin: auto 0 !important;
  }

  p {
    margin-right: ${SPACING.sm}px !important;
  }
`

const gradientKeyframe = keyframes`
  0% {
    background-position: 0% 50%
  }

  50% {
    background-position: 100% 50%
  }
  
  100% {
    background-position: 0% 50%
  }
`

export const FARE_GRADIENT = css`
  background: linear-gradient(
    to right,
    ${FARE_COLORS.blue},
    ${FARE_COLORS.pink},
    ${FARE_COLORS.salmon}
  );
  background-size: 400% 400%;

  -webkit-animation: ${gradientKeyframe} 10s ease infinite;
  -moz-animation: ${gradientKeyframe} 10s ease infinite;
  animation: ${gradientKeyframe} 10s ease infinite;
`

export const HeaderStrip = styled.div`
  width: 100%;
  height: 1px;
  ${FARE_GRADIENT};
`

export const HeaderLinkWrapper = styled.div`
  display: flex;
`

export const HeaderLink = styled(motion.div)<{ isActive?: boolean }>`
  display: grid;
  align-items: center;
  line-height: 0;

  > a {
    display: grid;
    height: 36px;
    width: 36px;
    transition: 0.2s ease-in-out;
    border: 2px solid transparent;
    align-items: center;
    justify-content: center;
  }

  ${({ isActive }) =>
    !isActive
      ? css`
          > * {
            opacity: 0.25;
          }
        `
      : css`
          > a {
            line-height: 0;
            border-radius: 6px;
            border: 2px solid ${FARE_COLORS.blue};
          }
        `}

  &:not(:last-of-type) {
    margin-right: ${SPACING.lg}px;
  }

  &:hover {
    cursor: pointer;
    opacity: 1;
  }

  img {
    width: 24px;
    height: 24px;
  }
`

export const AddressWrapper = styled(motion.div)`
  display: flex;
  background: ${BACKGROUND_COLORS.two};
  padding: ${SPACING.xs}px;
  padding-left: ${SPACING.sm}px;
  border: 1px solid ${BORDER_COLORS.one};
  border-radius: 6px !important;

  > * {
    margin: auto 0;
  }
`

export const StyledSelect = styled(Select)`
  z-index: 500;
  border: 0px solid ${BORDER_COLORS.one} !important;
  padding: 0 !important;
  user-select: none;
  width: fit-content;

  .react-dropdown-select-content {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
  }

  .react-dropdown-select-dropdown-handle {
    opacity: 0;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }

  * {
    z-index: 200;
  }

  .react-dropdown-select-dropdown {
    width: 100% !important;
    text-align: right;

    ${FONT_STYLES.xs}
    border: 1px solid ${BORDER_COLORS.one} !important;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    background-color: ${BACKGROUND_COLORS.one};
    backdrop-filter: blur(8px);

    > div {
      background-color: ${BACKGROUND_COLORS.one};
      backdrop-filter: blur(8px) !important;
      transition: 0.2s ease-in-out;

      &:last-of-type {
        border-bottom-left-radius: 6px;
        border-bottom-right-radius: 6px;
      }

      &:hover {
        background-color: ${BACKGROUND_COLORS.two} !important;
      }
    }
  }

  &:focus {
    outline: none !important;
    background: transparent;
    backdrop-filter: blur(8px);
    box-shadow: 0px 0px 4px 1px rgba(15, 180, 255, 0.5) !important;
  }
`

export const SelectItem = styled.div`
  padding: ${SPACING.sm}px !important;
`

export const UsernameInput = styled.div`
  position: relative;
  width: 200px;

  .input-prefix {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  input {
    padding-right: 64px !important;
    padding-left: 40px !important;
  }
`

export const ActionButtonWrapper = styled.div`
  display: flex;
  right: 0;

  > button {
    background: none;
    border: none;
    cursor: pointer;
    opacity: 0.4;
    transition: opacity ease-in-out 0.2s;

    &:last-of-type {
      padding-right: 0;
    }

    > img {
      transform: translateY(2px);
      width: 16px;
      height: 16px;
    }

    &:hover {
      opacity: 1;
    }
  }
`
export const SimpleSpinner = styled(motion.div)`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid ${FARE_COLORS.blue};
  border-top-color: #333;
  animation: spin 1s ease-in-out infinite;
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`
export const SimpleSpinnerContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`
