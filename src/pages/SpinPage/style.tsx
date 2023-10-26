import { floatingContainer } from '@/design/css'
import { BREAKPOINTS, SPACING } from '@/design/spacing'

export const FormWrapper = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: max-content;
  grid-template-columns: repeat(auto-fit, minmax(315px, 1fr));
  @media only screen and (max-width: ${BREAKPOINTS.md + 40}px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`

export const LeftSpinContainer = styled.div`
  display: grid;
  grid-template-rows: 500px 1fr;
  grid-gap: ${SPACING.md}px;
  grid-row: 1 / span 2;
`

export const RightSpinContainer = styled.div`
  display: grid;
  overflow: scroll;
  grid-column: 2 / span 2;
  grid-row: 1 / span 2;
  grid-auto-rows: auto;
`

export const SpinGameWrapper = styled.div`
  display: flex;
  grid-row: 1;
  justify-content: center;
  border-radius: 6px;
  width: 100%;
  // height: 100%;
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
