import { floatingContainer } from '@/design'
import { BREAKPOINTS, SPACING } from '@/design/spacing'

export const DiceGameWrapper = styled.div`
  display: flex;
  grid-row: 1;
  justify-content: center;
  border-radius: 6px;
  width: 100%;
  height: 500px;
  grid-row: 1 / span 1;

  @media only screen and (max-width: ${BREAKPOINTS.lg}px) {
    grid-column: 1 / span 5;
  }

  ${floatingContainer}

  > p {
    margin-top: 0;
  }
`

export const LeftDiceContainer = styled.div`
  display: grid;
  grid-template-rows: 500px 1fr;
  grid-gap: ${SPACING.md}px;
  grid-row: 1 / span 2;
`

export const RightDiceContainer = styled.div`
  display: grid;
  overflow: scroll;
  grid-column: 2 / span 2;
  grid-row: 1 / span 2;
  grid-auto-rows: auto;
`

export const EntriesWrapper = styled.div`
  grid-column: 1 / span 1;
  grid-row: 2 / span 1;
  height: 100%;
`
