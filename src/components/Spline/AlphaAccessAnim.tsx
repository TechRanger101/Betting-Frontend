import Spline from '@splinetool/react-spline'
import { FONT_STYLES, TEXT_COLORS } from '@/design'

const SAlphaAccessAnim = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  z-index: 999;
  top: 0px;
  left: 0px;
  > button {
    position: absolute;
    top: 12px;
    left: 12px;
    background: blue;
    color: ${TEXT_COLORS.one};
    transition: all ease-in-out 0.25s;
    ${FONT_STYLES.xxl}

    &:active {
      background: darkblue;
    }
  }
`

const splineCodeUrl = 'https://prod.spline.design/VqH2OaOaICC8LwI0/scene.splinecode'
// const splineCodeUrl = 'https://prod.spline.design/4g1wra0k0JjOP4cr/scene.splinecode'

function AlphaAccessAnim() {
  const spline = useRef<any>(null)
  const sphereObj = useRef<any>(null)

  const onLoad = useCallback((splineApp: any) => {
    spline.current = splineApp
    console.log(splineApp)
    if (sphereObj.current) return
    sphereObj.current = splineApp.findObjectByName('Sphere')
  }, [])

  const triggerAnim = useCallback(() => {
    if (!sphereObj.current) return

    spline.current.emitEvent('mouseUp', 'Sphere')
  }, [sphereObj])

  return (
    <SAlphaAccessAnim>
      <Spline scene={splineCodeUrl} onLoad={onLoad} />
      <button onClick={triggerAnim}>CONNECT TO WALLET</button>
    </SAlphaAccessAnim>
  )
}

export default AlphaAccessAnim
