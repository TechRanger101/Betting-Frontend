type RevertReasonObj = {
  term: string
  errMsg: string
}

// TODO: Need to get full list of possible reverts on FareSpin
export const revertReasonList: RevertReasonObj[] = [
  {
    term: 'Round has not started yet.',
    errMsg: 'Round has not started yet. Please submit your entry during the countdown period.',
  },
  {
    term: 'Already entered in current round',
    errMsg:
      'You have already entered an entry for this round. Please wait for the wheel to spin and a new round to start then resubmit.',
  },
]
