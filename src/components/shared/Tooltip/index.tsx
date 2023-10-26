import React, { type FC } from 'react'
import { Tooltip } from 'react-tooltip'

interface FareToolTipProps {
  className: string
  place: 'top' | 'right' | 'bottom' | 'left'
  content: string
  children: React.ReactNode
  variant?: 'dark' | 'light' | 'success' | 'warning' | 'error' | 'info'
}

export const FareTooltip: FC<FareToolTipProps> = ({
  className,
  variant,
  place,
  content,
  children,
}) => {
  return (
    <div
      data-tooltip-place={place}
      data-tooltip-content={content}
      data-tooltip-variant={variant}
      className={className}
      data-tooltip-id="fare-tooltip"
      id='"fare-tooltip"'
      style={{ padding: 0 }}
    >
      {children}
    </div>
  )
}

interface DisplayToolTipProps {
  id: string
  style?: React.CSSProperties
}

export const DisplayToolTip: FC<DisplayToolTipProps> = ({ id, style }) => (
  <Tooltip id={id} style={style} />
)
