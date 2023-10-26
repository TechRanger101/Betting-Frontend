import { BACKGROUND_COLORS, BORDER_COLORS, TEXT_COLORS } from '@/design/colors'
import { SPACING } from '@/design/spacing'
import { FONT_STYLES } from '@/design'
import { BaseButton } from '../Button/style'

const modalHeader = 60

export const ModalHeader = styled.div`
  height: fit-content;
  display: flex;
  justify-content: space-between;
  position: sticky;
  top: 0;
  backdrop-filter: blur(3px);
  height: ${modalHeader}px;
  border-bottom: 1px solid ${BORDER_COLORS.one};
  background: ${BACKGROUND_COLORS.two};
`

export const ContentColumn = styled.div`
  margin: auto;
  text-transform: uppercase;

  > * {
    ${FONT_STYLES.md};
  }
`

export const ActionColumn = styled.div`
  display: flex;
  align-self: center;
  margin: auto 0;
  margin-right: ${SPACING.sm}px;

  button {
    margin: auto;
    cursor: pointer;
    background: none;
    border: none;
    color: ${TEXT_COLORS.one};
  }

  img {
    width: 16px;
    height: 16px;
    filter: grayscale(1);
  }
`

export const ModalContent = styled.div`
  padding: ${SPACING.lg}px;
  text-align: justify;
  backdrop-filter: blur(3px);

  > * {
    margin: 0;
  }

  > a {
    text-decoration-line: underline;
    cursor: pointer;
  }
`

export const ModalFooter = styled.div`
  position: sticky;
  bottom: 0;
  backdrop-filter: blur(3px);
  padding: ${SPACING.sm}px;
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid ${BORDER_COLORS.one};

  > * {
    margin: auto 0;
    text-transform: uppercase;

    &:not(:last-child) {
      margin-right: ${SPACING.sm}px;
    }
  }

  > a {
    cursor: pointer;
  }

  > button {
    width: fit-content;
  }
`

export const ModalFooterButton = styled(BaseButton)`
  margin: ${SPACING.md}px;
  width: initial;

  &:hover {
    background: #0f6fff90;
    box-shadow: 0px 0px 10px #0f6fff;
  }
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`

export const DenyButton = styled.a`
  cursor: pointer;
`
