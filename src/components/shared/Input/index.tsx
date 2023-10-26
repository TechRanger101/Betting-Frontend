import { type MutableRefObject, type InputHTMLAttributes } from 'react'
import { NumericFormat, type NumericFormatProps } from 'react-number-format'
import { BACKGROUND_COLORS, BORDER_COLORS, FARE_COLORS, TEXT_COLORS } from '@/design/colors'

import { FONT_STYLES } from '@/design'
import { SPACING } from '@/design/spacing'

const Suffix = styled.div`
  height: 100%;
  position: absolute;
  right: 0px;
  top: 0px;
  display: flex;
  align-items: stretch;
  justify-content: center;
  margin-right: ${SPACING.xs}px;
`
const Prefix = styled.div`
  height: 100%;
  position: absolute;
  left: 0px;
  top: 0px;
  display: flex;
  align-items: stretch;
  justify-content: center;
  margin-left: ${SPACING.xs}px;
`

const InputWrapper = styled.div<{ hasPrefix?: boolean; hasSuffix?: boolean }>`
  display: flex;
  position: relative;

  input {
    ${({ hasPrefix }) =>
      hasPrefix &&
      `
      padding-left: ${SPACING.lg + SPACING.sm}px !important;
    `}

    ${({ hasSuffix }) =>
      hasSuffix &&
      `
    padding-right: ${SPACING.xl + SPACING.xs}px !important;
  `}
  }

  ${Suffix},
  ${Prefix} {
    > * {
      border-radius: 6px;
      text-transform: uppercase;
      color: ${TEXT_COLORS.one};
      ${FONT_STYLES.xs};
      margin: auto;
    }

    button {
      right: 0;
      background: ${BACKGROUND_COLORS.two};
      border: 1px solid ${BORDER_COLORS.one};
      transition: 0.2s ease-in-out;
      all: unset;
      background: ${BACKGROUND_COLORS.two};
      border: 1px solid ${BORDER_COLORS.one};
      color: ${TEXT_COLORS.two};
      ${FONT_STYLES.xs};
      border-radius: 4px;
      min-width: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      margin: auto;
      padding: ${SPACING.xxs}px;
      min-height: 18px;

      &:not(:last-of-type) {
        margin-right: 6px;
      }

      &:hover {
        color: ${TEXT_COLORS.one};
        border: 1px solid ${FARE_COLORS.blue};
      }
    }
  }
`

const BaseInput = styled.input<{ $hasPrefix?: boolean }>`
  background: ${BACKGROUND_COLORS.one};
  border: 1px solid ${BORDER_COLORS.one};
  color: ${TEXT_COLORS.one};
  border-radius: 6px;
  padding: ${SPACING.sm}px;
  width: calc(100% - ${SPACING.sm * 2}px);
  display: block;

  // FIXME: Need to determine actual width of prefix to be slotted into left padding here
  padding-left: ${({ $hasPrefix }) => ($hasPrefix ? SPACING.xl : SPACING.xs)}px !important;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  &[type='number'] {
    -moz-appearance: textfield;
  }

  &:focus {
    outline: none;
    border: 2px solid ${BORDER_COLORS.one};
  }
`

interface IInput {
  inputPrefix?: JSX.Element
  inputSuffix?: JSX.Element
  isNumeric?: boolean
  onEnter?: (e: KeyboardEvent) => void
  customRef?: MutableRefObject<HTMLInputElement | null>
}

export const Input = ({
  inputPrefix,
  inputSuffix,
  isNumeric,
  onEnter,
  getInputRef,
  customRef,
  ...props
}: IInput & InputHTMLAttributes<HTMLInputElement> & NumericFormatProps) => {
  const inputRef: MutableRefObject<HTMLInputElement | null> = useRef<HTMLInputElement>(null)

  const setInputRef = useCallback(
    (ref: HTMLInputElement) => {
      inputRef.current = ref
      if (typeof getInputRef === 'function') getInputRef(ref)
    },
    [getInputRef]
  )

  useEffect(() => {
    const inputElem = getInputRef ? inputRef.current : customRef?.current
    if (!inputElem) return

    const execOnEnter = (e: KeyboardEvent) => {
      if (e.code === 'Enter' && onEnter !== undefined) {
        onEnter(e)
      }
    }
    inputElem.addEventListener('keypress', execOnEnter)

    return () => inputElem.removeEventListener('keypress', execOnEnter)
  }, [customRef, getInputRef, onEnter])

  return (
    <InputWrapper hasPrefix={!!inputPrefix}>
      <Prefix className="input-prefix">{inputPrefix}</Prefix>
      {isNumeric ? (
        <NumericFormat
          customInput={BaseInput}
          $hasPrefix={Boolean(inputPrefix)}
          {...(props as any)}
          getInputRef={setInputRef}
        />
      ) : (
        <BaseInput
          type={'text'}
          {...(props as InputHTMLAttributes<HTMLInputElement>)}
          ref={customRef}
        />
      )}
      <Suffix className="input-suffix">{inputSuffix}</Suffix>
    </InputWrapper>
  )
}
