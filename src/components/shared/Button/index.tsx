import { ForwardRefComponent, HTMLMotionProps, motion } from 'framer-motion'
import { type ButtonHTMLAttributes, type ReactNode } from 'react'

import { BaseButton, LoadingBar } from './style'

export enum ButtonEnum {
  BASE,
  TRANSACTION,
  CONNECT_WALLET,
}

interface IButtonProps extends HTMLMotionProps<'button'> {
  buttonType: ButtonEnum
  children?: ReactNode | undefined
  disabled: boolean
  isLoading: boolean
  loadingText?: string | JSX.Element
}

export const Button = ({
  buttonType,
  disabled,
  isLoading,
  loadingText = 'Loading',
  children,
  ...props
}: IButtonProps) => {
  return (
    <BaseButton
      {...props}
      transition={{ duration: 0.25 }}
      buttonType={buttonType}
      disabled={disabled}
      isLoading={isLoading}
      layout
    >
      {isLoading && <LoadingBar side={'left'} buttonType={buttonType} />}
      <motion.div key={isLoading ? 'loading-text' : 'regular-text'} transition={{ duration: 0.5 }}>
        {isLoading ? `${loadingText}...` : children}
      </motion.div>
      {isLoading && <LoadingBar side={'right'} buttonType={buttonType} />}
    </BaseButton>
  )
}
