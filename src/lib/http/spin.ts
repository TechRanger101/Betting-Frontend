import axios from 'axios'
import { HTTP_URL } from '@/constants/http'

const spinRoute = (route: string) => `${HTTP_URL}/spin/${route}`

export type SpinClaimable = {
  mintAmount: string
  roundId: number
}

export const fetchClaimableRewards = async (token: string) => {
  const { data } = await axios({
    headers: { token },
    method: 'GET',
    url: spinRoute('claimable-rewards'),
  })
  const claimable = data.claimables as SpinClaimable[]

  return claimable
}
