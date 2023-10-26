// Components
import { FormWrapper, LeftSpinContainer, RightSpinContainer, SpinGameWrapper } from './style'
import Wheel from '@/components/Wheel'
import LiveEntries from '@/components/shared/LiveEntries'
import SpinForm from '@/components/SpinForm'

// Styles
import { PageWrapper } from '../style'
import { GamePage } from '..'
import SpinResultDisplay from '@/components/shared/ResultDisplay/SpinResultDisplay'

export const SpinPage = () => {
  return (
    <PageWrapper>
      <GamePage mode={'spin'}>
        <LeftSpinContainer>
          <SpinGameWrapper>
            <Wheel />
          </SpinGameWrapper>

          <LiveEntries />
        </LeftSpinContainer>
        <RightSpinContainer>
          <FormWrapper>
            <SpinResultDisplay />
            <SpinForm />
          </FormWrapper>
        </RightSpinContainer>
      </GamePage>
    </PageWrapper>
  )
}
