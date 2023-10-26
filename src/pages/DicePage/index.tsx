import { DiceGameWrapper, LeftDiceContainer, RightDiceContainer } from './style'
import LiveEntries from '@/components/shared/LiveEntries'
import { PageWrapper } from '../style'
import { GamePage } from '..'
import { DiceForm } from '@/components/DiceForm'

export const DicePage = () => {
  return (
    <PageWrapper>
      <GamePage mode={'dice'}>
        <LeftDiceContainer>
          <DiceGameWrapper>
            <div></div>
          </DiceGameWrapper>
          <LiveEntries />
        </LeftDiceContainer>
        <RightDiceContainer>
          {/* <DiceResultDisplay /> */}
          <DiceForm />
        </RightDiceContainer>
      </GamePage>
    </PageWrapper>
  )
}
