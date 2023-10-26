import Modal from 'react-modal'
import { BORDER_COLORS } from '@/design/colors'
import { SVGS } from '@/assets'
import { ActionColumn, ContentColumn, ModalContent, ModalFooter, ModalHeader } from './style'

Modal.setAppElement('#root')

interface IBaseModalProps {
  show?: boolean
  setShow: (show: boolean) => void
  width?: number
  maxWidth?: number
  height?: number
  title?: JSX.Element | string
  content?: JSX.Element | string
  footer?: JSX.Element | string
  error?: string
  noPadding?: boolean
}

export const BaseModal = ({
  show,
  width,
  maxWidth,
  height,
  setShow,
  title,
  content,
  footer,
  error,
  noPadding,
}: IBaseModalProps) => {
  const modalContentRef = createRef<HTMLDivElement>()
  return (
    <Modal
      isOpen={Boolean(show)}
      onRequestClose={() => setShow(false)}
      closeTimeoutMS={200}
      style={{
        content: {
          height: height ?? 'fit-content',
          width: width ?? 'fit-content',
          minWidth: 300,
          maxWidth: maxWidth ?? 450,
          margin: 'auto',
          background: '#00000090',
          padding: 0,
          border: `1px solid ${BORDER_COLORS.one}`,
        },
        overlay: { backgroundColor: '#00000080', backdropFilter: 'blur(3px)' },
      }}
    >
      <ModalHeader>
        <ContentColumn>{title}</ContentColumn>
        <ActionColumn>
          <button type="button" onClick={() => setShow?.(false)}>
            <img src={SVGS.crossIcon} />
          </button>
        </ActionColumn>
      </ModalHeader>
      <ModalContent style={noPadding ? { padding: 0 } : {}} ref={modalContentRef}>
        {content}
      </ModalContent>
      {footer ? <ModalFooter>{footer}</ModalFooter> : null}
    </Modal>
  )
}
