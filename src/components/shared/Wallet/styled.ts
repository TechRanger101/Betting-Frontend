import styled from 'styled-components'
import { BORDER_COLORS } from '@/design'

export const WalletButtonsWrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;

  > * {
    grid-row: span 1;
    width: 100%;
    border: none;
    border-radius: 0;

    &:not(:last-of-type) {
      height: max-content;
      border-bottom: 1px solid ${BORDER_COLORS.one};
    }
  }
`
export const StyledConnectContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`
