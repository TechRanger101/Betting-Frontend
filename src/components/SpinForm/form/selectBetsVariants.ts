import { type Variants } from 'framer-motion'

export const betQueuedVariant: Variants = {
  initial: {
    opacity: 1,
  },
  animate: {
    opacity: 1,
    transition: {
      type: 'spring',
      duration: 1,
      staggerChildren: 0.1,
      delayChildren: 0.18,
    },
  },
  exit: {
    transition: {
      type: 'spring',
      staggerChildren: 0.1,
    },
  },
}

export const betSubmittedVariant: Variants = {
  initial: {
    opacity: 1,
  },
  animate: {
    opacity: 1,
    transition: {
      type: 'spring',
      duration: 1,
      staggerChildren: 0.1,
      delayChildren: 0.18,
    },
  },
  exit: {
    y: '-40%',
    opacity: 0,
    transition: {
      type: 'spring',
      staggerChildren: 0.1,
    },
  },
}

export const betItemVariant: Variants = {
  initial: {
    y: '40%',
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      y: {
        type: 'spring',
      },
    },
  },
  exit: {
    y: '-40%',
    opacity: 0,
  },
}

export const queuedItemVariant: Variants = {
  initial: {
    y: '-40px',
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
    // transition: {
    //   // y: {
    //   // type: 'spring',
    //   duration: 0.25,
    //   // },
    // },
  },
  exit: {
    x: '50px',
    y: 0,
    opacity: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
    // transition: {
    //   duration: 0.25,
    //   // type: 'spring',
    // },
  },
}

export const fetchingSubmittedBets: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
}

export const submittedAlertOverlayVariant: Variants = {
  initial: {
    opacity: 0,
    display: 'flex',
  },
  animate: {
    opacity: 1,
    display: 'flex',
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    display: 'none',
    transition: {
      delay: 0.2,
      duration: 0.3,
    },
  },
}

export const submittedAlertVariant: Variants = {
  initial: {
    x: '-130%',
    y: 0,
    opacity: 1,
  },
  animate: {
    x: 0,
    transition: {
      delay: 0.2,
      duration: 0.5,
      type: 'spring',
    },
  },
  exit: {
    y: '150px',
    opacity: 0,
    transition: {
      duration: 0.5,
      type: 'spring',
    },
  },
}
