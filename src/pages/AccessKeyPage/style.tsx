import { SPACING } from '@/design'

export const SAccessKeyPage = styled.div`
  background: #05090b;
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: 999;
  top: 0px;
  left: 0px;
  display: flex;
  align-content: center;
  justify-content: center;

  > canvas {
    height: 100vh !important;
    width: 100% !important;
  }
`

export const SplineButtonWrapper = styled.div`
  width: 100%;
  position: absolute;
  top: ${SPACING.sm}px;
  left: ${SPACING.sm}px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  button {
    margin-right: ${SPACING.md}px;
  }
`

export const SplineButtonRow = styled.div`
  display: flex;
  flex-direction: row;
`
