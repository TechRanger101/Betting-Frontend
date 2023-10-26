import {
  BottomDirectory,
  DirectoryWrapper,
  ExternalLinkWrapper,
  FloatingDirectory,
  LinkWrapper,
  TopDirectory,
} from './style'
import { SVGS } from '@/assets'

export const LeftPanel = () => {
  const routeLinks = [
    {
      title: 'spin',
      img: SVGS.spinIcon,
      to: '/spin',
    },
    {
      title: 'dice',
      img: SVGS.diceIcon,
      to: '/dice',
    },
    {
      title: 'bombs',
      img: SVGS.bombIcon,
      to: '/bomb',
    },
    {
      title: 'plinko',
      img: SVGS.plinkoIcon,
      to: '/plinko',
    },

    {
      title: 'slots',
      img: SVGS.slotsIcon,
      to: '/slots',
    },
  ]

  const externalLinks = [
    {
      title: 'TWITTER',
      img: SVGS.twitterIcon,
      to: 'https://www.twitter.com/fareprotocol',
    },
    {
      title: 'DISCORD',
      img: SVGS.discordIcon,
      to: 'https://discord.com/invite/zr6CVXmNyC',
    },
  ]

  const location = useLocation()
  const activePage = useMemo(() => {
    return location.pathname
  }, [location])

  return (
    <DirectoryWrapper>
      <FloatingDirectory
        transition={{
          duration: 1,
          ease: 'easeInOut',
        }}
        initial={{
          opacity: 0,
          transform: 'translateX(-100px)',
        }}
        animate={{
          opacity: 1,
          transform: 'translateX(0px)',
        }}
        exit={{
          opacity: 0,
          transform: 'translateX(-100px)',
        }}
      >
        <TopDirectory>
          {routeLinks.map(route => (
            <LinkWrapper key={route.title} $isActive={route.to === activePage} to={route.to}>
              <img src={route.img} alt={`${route.img}-icon`} />
              <p>{route.title}</p>
            </LinkWrapper>
          ))}
        </TopDirectory>
        <BottomDirectory>
          {externalLinks.map((link, i) => (
            <ExternalLinkWrapper
              key={link.title}
              href={link.to}
              target="_blank"
              rel="noreferrer"
              $delay={(routeLinks.length + i + 1) / 10}
            >
              <img src={link.img} alt={`${link.img}-icon`} />
              <p>{link.title}</p>
            </ExternalLinkWrapper>
          ))}
        </BottomDirectory>
      </FloatingDirectory>
    </DirectoryWrapper>
  )
}
