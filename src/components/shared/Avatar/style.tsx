import { FARE_COLORS } from '@/design'

export const AvatarWrapper = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  align-items: center;
  width: 22px;
  height: 22px;
  border: 2px solid ${FARE_COLORS.blue}80;

  img {
    border-radius: 50%;
    height: 16px;
    width: 16px;
  }
`
