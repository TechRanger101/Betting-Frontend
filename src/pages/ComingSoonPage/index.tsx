import { PageWrapper } from '../style'

interface IComingSoonPageProps {
  gameName?: string
}

const SComingSoonText = styled.h3`
  text-transform: uppercase;
`

const ComingSoonPage = ({ gameName }: IComingSoonPageProps) => {
  return (
    <>
      <PageWrapper>
        <SComingSoonText>{gameName} coming soon</SComingSoonText>
      </PageWrapper>
    </>
  )
}
export default ComingSoonPage
