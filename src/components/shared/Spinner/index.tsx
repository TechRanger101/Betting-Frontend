import { SpinnerWrapper, Block, ToastBlock } from './style'

export type GameModes = 'default' | 'win' | 'lose' | 'spin' | 'dice'

export interface ISpinnerProps {
  mode: GameModes
  blockSize?: number
  blockGap?: number
}

export const Spinner = ({ mode = 'default', blockSize, blockGap }: ISpinnerProps) => {
  return (
    <div>
      <SpinnerWrapper gap={blockGap}>
        <Block mode={mode} size={blockSize}></Block>
        <Block mode={mode} size={blockSize}></Block>
        <Block mode={mode} size={blockSize}></Block>
        <Block mode={mode} size={blockSize}></Block>
      </SpinnerWrapper>
    </div>
  )
}

export type ToastModes = 'default' | 'success' | 'error'

export interface IToastSpinnerProps extends Omit<ISpinnerProps, 'mode'> {
  mode: ToastModes
}

export const ToastSpinner = ({ mode = 'default', blockSize, blockGap }: IToastSpinnerProps) => {
  return (
    <div>
      <SpinnerWrapper gap={blockGap}>
        <ToastBlock mode={mode} size={blockSize}></ToastBlock>
        <ToastBlock mode={mode} size={blockSize}></ToastBlock>
        <ToastBlock mode={mode} size={blockSize}></ToastBlock>
        <ToastBlock mode={mode} size={blockSize}></ToastBlock>
      </SpinnerWrapper>
    </div>
  )
}
