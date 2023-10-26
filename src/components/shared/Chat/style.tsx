import { motion } from 'framer-motion'
import { BORDER_COLORS, TEXT_COLORS } from '@/design/colors'
import { BREAKPOINTS, SPACING } from '@/design/spacing'
import { FONT_STYLES } from '@/design'

type ChatBubbleProps = {
  borderColor?: string
}

export const ChatBubble = styled(motion.div)<ChatBubbleProps>`
  padding: ${SPACING.sm}px;
  position: relative;
  border-radius: 6px;
  position: relative;
  box-sizing: border-box;
  background: #000000a8;
  background-clip: padding-box;
  border: solid 1px transparent;

  &:before {
    content: '';
    position: absolute;
    top: -1px;
    right: -1px;
    bottom: -1px;
    left: -1px;
    z-index: -1;
    border-radius: 6px;

    ${({ borderColor }) =>
      borderColor &&
      css`
        background: black;
        background: linear-gradient(
          225deg,
          #${borderColor}30,
          #${borderColor}60,
          #${borderColor}30
        );
      `}
`

export const BubbleHeader = styled.div`
  display: flex;

  > p {
    margin-left: ${SPACING.sm}px;
  }

  > * {
    margin: auto 0;
  }
`

export const ChatWrapper = styled.div`
  position: sticky;
  bottom: 0;
`

export const ChatBubbles = styled.div`
  padding-bottom: ${SPACING.sm}px;
  overflow-y: scroll;
  height: 100%;

  > div {
    &:first-of-type {
      ${ChatBubble} {
        border-top: 1px solid ${BORDER_COLORS.one};
      }
    }

    &:not(:last-of-type) {
      margin-bottom: ${SPACING.sm}px;
    }
  }
`

export const SSendBtn = styled.button`
  right: 0;
  margin: ${SPACING.xs}px;
  border: 1px solid ${BORDER_COLORS.one};
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    filter: grayscale(100%);
  }
`

export const SBottomScroller = styled(motion.div)`
  position: absolute;
  bottom: 72px;
  right: 10px;
  cursor: pointer;
  background-color: rgba(0, 19, 48, 0.8);
  border: 1px solid #0f6fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  height: 26px;
  width: 26px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 3px -2px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px,
    rgba(0, 0, 0, 0.12) 0px 1px 8px 0px;

  > img {
    height: 24px;
    width: 24px;
  }
`

export const Avatar = styled.div`
  display: flex;

  > * {
    margin: auto 0;
  }

  p {
    margin-left: ${SPACING.xs}px;
  }

  div.paper {
    height: 16px !important;
    width: 16px !important;
    margin-right: ${SPACING.xs}px !important;
  }
`

export const Message = styled.div`
  display: column;
  position: relative;
  color: ${TEXT_COLORS.two};
  margin-top: ${SPACING.sm}px;

  @media only screen and (max-width: ${BREAKPOINTS.lg}px) {
    ${FONT_STYLES.sm};
  }

  p {
    ${FONT_STYLES.md};
    margin-top: ${SPACING.sm}px;
    margin-bottom: 0;
    overflow-wrap: break-word;
  }
`

export const ChatList = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  background: transparent;
`

export const ChatInputWrapper = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: ${SPACING.sm}px;

  > div > input {
    padding-right: ${SPACING.xxl}px;
  }
`

export const EmojiButton = styled.button`
  padding: 0;
  width: fit-content;
  display: grid;
  background: none;
  border: none;

  img {
    align-self: center;
    width: 20px;
    height: 20px;
    /* filter: invert(100); */
    cursor: pointer;
  }
`
