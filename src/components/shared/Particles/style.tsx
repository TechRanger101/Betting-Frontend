import { COMPONENTS } from '../../../design/components'

export const ParticlesWrapper = styled.div`
  position: absolute;

  canvas {
    height: calc(100vh - ${COMPONENTS.header}px);
    width: 100%;
    bottom: 0;
  }
`
