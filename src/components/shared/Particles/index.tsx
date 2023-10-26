import { Particles as Particle } from 'react-particles'
import { loadFull } from 'tsparticles'
import { FARE_COLORS } from '@/design'
import type { Engine, Container } from 'tsparticles-engine'
import { ParticlesWrapper } from './style'

export const Particles = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    // console.log(engine)
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine)
  }, [])

  const particlesLoaded = useCallback(async (_container?: Container | undefined) => {
    // console.log(_container)
  }, [])

  return (
    <ParticlesWrapper>
      <Particle
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          fpsLimit: 120,
          pauseOnBlur: true,
          pauseOnOutsideViewport: true,
          particles: {
            color: {
              value: [
                FARE_COLORS.blue,
                FARE_COLORS.peach,
                FARE_COLORS.pink,
                FARE_COLORS.salmon,
                FARE_COLORS.aqua,
              ],
            },
            collisions: {
              enable: true,
            },
            move: {
              enable: true,
              random: false,
              speed: 0.5,
              direction: 'top',
            },
            number: {
              value: 200,
            },
            opacity: {
              value: 1,
            },
            shape: {
              type: 'circle',
            },
            size: {
              value: { min: 0.5, max: 0.75 },
            },
          },
        }}
      />
    </ParticlesWrapper>
  )
}
