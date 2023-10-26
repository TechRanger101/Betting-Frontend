import type { Transition, Variants } from 'framer-motion'

import type { CountdownCircleAnimProps } from '../shared/Svg/CountdownSvg'
import type { TickPathAnimProps } from './types'

export const transitions = {
  softBounce: {
    type: 'spring',
    bounce: 0.35,
    damping: 4.75,
    mass: 0.5,
  },
  tween: {
    type: 'tween',
    ease: 'easeOut',
    duration: 1.5,
  },
}

export const wheelSpinPresets = {
  normalBounce: {
    type: 'spring',
    bounce: 0.5,
    duration: 1.5,
  } as Transition,
  wavePool: {
    type: 'spring',
    damping: 4,
    mass: 29,
    stiffness: 2000,
  } as Transition,
}

// TODO: Need to make this dynamic so it can change transition speed
export const spinTickAnimate: Variants = {
  tickSpinActive: (props: TickPathAnimProps) => ({
    // fill: props.color,
    // stroke: props.color,
    // strokeOpacity: 1,
    // // fillOpacity: 1,
    // // fillOpacity: 0.05,
    // transform: 'scale(1.4)',
    // // filter: 'grayscale(0%) url(#tick-spin-glow)',
    // // filter: 'grayscale(0%) url(#neon-glow)',
    // filter: 'grayscale(0%) url(#tick-spin-glow)',
    // transition: {
    //   fillOpacity: {
    //     type: 'tween',
    //     ease: 'easeOut',
    //     // duration: 0.1,
    //     // duration: 0.025,
    //     duration: 0,
    //   },
    //   strokeOpacity: {
    //     type: 'tween',
    //     ease: 'easeOut',
    //     // duration: 0.1,
    //     // duration: 0.025,
    //     duration: 0,
    //   },
    //   filter: {
    //     type: 'tween',
    //     ease: 'easeOut',
    //     // duration: 0.1,
    //     // duration: 0.025,
    //     duration: 0,
    //   },
    //   transform: {
    //     // type: 'spring',
    //     type: 'tween',
    //     ease: 'circIn',
    //     duration: 0,
    //   },
    // },
    fill: props.color,
    stroke: props.color,
    fillOpacity: 1,
    transform: 'scale(1.4)',
    filter: 'grayscale(0%) url(#tick-spin-glow)',
    transition: {
      fillOpacity: {
        type: 'tween',
        ease: 'easeOut',
        // duration: 0.1,
        duration: 0.025,
      },
      filter: {
        type: 'tween',
        ease: 'easeOut',
        // duration: 0.1,
        duration: 0.025,
      },
      transform: {
        type: 'tween',
        ease: 'circIn',
        duration: 0,
      },
    },
  }),
  tickSpinBetActive: (props: TickPathAnimProps) => ({
    fill: props.color,
    stroke: props.color,
    fillOpacity: 1,
    transform: 'scale(1.4)',
    filter: 'grayscale(0%) url(#tick-spin-glow)',
    transition: {
      fillOpacity: {
        type: 'tween',
        ease: 'easeOut',
        // duration: 0.1,
        duration: 0.025,
      },
      filter: {
        type: 'tween',
        ease: 'easeOut',
        // duration: 0.1,
        duration: 0.025,
      },
      transform: {
        type: 'tween',
        ease: 'circIn',
        duration: 0,
      },
    },
    // fill: props.color,
    // stroke: props.color,
    // fillOpacity: 1,
    // strokeOpacity: 1,
    // transform: 'scale(1.45)',
    // filter: 'grayscale(0%) url(#tick-spin-glow)',
    // transition: {
    //   fillOpacity: {
    //     type: 'tween',
    //     ease: 'easeOut',
    //     // duration: 0.1,
    //     // duration: 0.025,
    //     duration: 0,
    //   },
    //   strokeOpacity: {
    //     type: 'tween',
    //     ease: 'easeOut',
    //     // duration: 0.1,
    //     // duration: 0.025,
    //     duration: 0,
    //   },
    //   filter: {
    //     type: 'tween',
    //     ease: 'easeOut',
    //     // duration: 0.1,
    //     // duration: 0.025,
    //     duration: 0,
    //   },
    //   transform: {
    //     // type: 'spring',
    //     type: 'tween',
    //     ease: 'circIn',
    //     duration: 0,
    //   },
    // },
  }),
  tickSpinInactive: (props: TickPathAnimProps) => ({
    stroke: props.color,
    fill: props.color,
    fillOpacity: 0,
    strokeWidth: 1,
    strokeOpacity: 0.35,
    filter: 'grayscale(40%)',
    transform: 'scale(1)',
    transition: {
      fillOpacity: {
        type: 'tween',
        ease: 'linear',
        duration: 0.1,
        // duration: 0.2,
      },
      strokeOpacity: {
        type: 'tween',
        ease: 'easeOut',
        duration: 0.15,
        // duration: 0.3,
      },
      filter: {
        type: 'tween',
        duration: 0.5,
        // duration: 1,
      },
      transform: {
        type: 'spring',
        bounce: 0.5,
        duration: 1.5,
      },
    },
    // stroke: props.color,
    // fill: props.color,
    // fillOpacity: 0,
    // strokeWidth: 1,
    // strokeOpacity: 0.35,
    // filter: 'grayscale(40%)',
    // transform: 'scale(1)',
    // transition: {
    //   fillOpacity: {
    //     type: 'tween',
    //     ease: 'linear',
    //     // duration: 0.1,
    //     duration: 0,
    //   },
    //   strokeOpacity: {
    //     type: 'tween',
    //     ease: 'easeOut',
    //     // duration: 0.15,
    //     duration: 0,
    //   },
    //   filter: {
    //     type: 'tween',
    //     // duration: 0.5,
    //     duration: 0,
    //   },

    //   transform: {
    //     stiffness: 100,
    //     damping: 20,
    //     mass: 1,
    //     restSpeed: 1, // Animation stops when velocity is below 1
    //     restDelta: 0.2, // Animation stops when the remaining distance is less than 0.2
    //     // transition 4
    //     // type: 'spring',
    //     // damping: 30,
    //     // stiffness: 375,
    //     // mass: 1,
    //     // transition 3,
    //     // stiffness: 375,
    //     // damping: 20,
    //     // restSpeed: 0.1,
    //     // restDelta: 0.1,
    //     // mass: 10,
    //     // transition 2
    //     // bounce: 0.5,
    //     // duration: 1.5,
    //     // transition 1
    //     // type: 'tween',
    //     // duration: 0.08,
    //     // ease: 'backInOut',
    //   },
    // },
  }),
  tickSpinBetInactive: (props: TickPathAnimProps) => ({
    stroke: props.color,
    fill: props.color,
    fillOpacity: 0,
    strokeWidth: 1,
    strokeOpacity: 0.35,
    filter: 'grayscale(40%)',
    transform: 'scale(1)',
    transition: {
      fillOpacity: {
        type: 'tween',
        ease: 'linear',
        duration: 0.1,
        // duration: 0.2,
      },
      strokeOpacity: {
        type: 'tween',
        ease: 'easeOut',
        duration: 0.15,
        // duration: 0.3,
      },
      filter: {
        type: 'tween',
        duration: 0.5,
        // duration: 1,
      },
      transform: {
        type: 'spring',
        bounce: 0.5,
        duration: 1.5,
      },
    },

    // stroke: props.color,
    // fill: props.color,
    // fillOpacity: 0.4,
    // strokeWidth: 1,
    // strokeOpacity: 0.4,
    // filter: 'grayscale(40%)',
    // transform: 'scale(1)',
    // transition: {
    //   fillOpacity: {
    //     type: 'tween',
    //     ease: 'linear',
    //     duration: 0,
    //     // duration: 0.2,
    //   },
    //   strokeOpacity: {
    //     type: 'tween',
    //     ease: 'easeOut',
    //     // duration: 0.15,
    //     duration: 0,
    //   },
    //   filter: {
    //     type: 'tween',
    //     duration: 0,
    //     ease: 'easeOut',
    //   },
    //   transform: {
    //     stiffness: 100,
    //     damping: 20,
    //     mass: 1,
    //     restSpeed: 1, // Animation stops when velocity is below 1
    //     restDelta: 0.2, // Animation stops when the remaining distance is less than 0.2
    //     // type: 'spring',
    //     // damping: 30,
    //     // stiffness: 375,
    //     // mass: 1,
    //     // type: 'tween',
    //     // duration: 0.33,
    //     // ease: 'backInOut',
    //   },
    // },
  }),
  tickRecentlyActive: (props: TickPathAnimProps) => ({
    stroke: props.color,
    fill: props.color,
    fillOpacity: 0,
    strokeWidth: 1,
    strokeOpacity: 0.35,
    filter: 'grayscale(60%) url(#displacementFilter)',
    transform: 'scale(1)',
    transition: {
      fillOpacity: {
        type: 'tween',
        ease: 'easeOut',
        duration: 0.025,
      },
      strokeOpacity: {
        type: 'tween',
        ease: 'easeOut',
        duration: 0.025,
      },
      transform: {
        type: 'spring',
        bounce: 0.5,
        duration: 1.5,
      },
      filter: {
        type: 'spring',
        duration: 0.2,
      },
    },
  }),
}

export const pathVariants: Variants = {
  ...spinTickAnimate,
  initial: (props: TickPathAnimProps) => ({
    cursor: 'pointer',
    transform: 'scale(0)',
    filter: 'grayscale(0%)',
    strokeWidth: 1,
    stroke: props.color,
    strokeOpacity: 0.5,
    fillOpacity: 0,
    fill: props.color,
  }),
  initialSpinning: (props: TickPathAnimProps) => ({
    cursor: 'default',
    stroke: props.color,
    fill: props.color,
    fillOpacity: 0,
    strokeWidth: 1,
    strokeOpacity: 0.35,
    filter: 'grayscale(40%)',
    transform: 'scale(1)',
    transition: {
      fillOpacity: {
        type: 'tween',
        ease: 'easeOut',
        duration: 0.5,
      },
      strokeOpacity: {
        type: 'tween',
        ease: 'easeOut',
        duration: 0.5,
      },
      transform: transitions.softBounce,
    },
  }),
  animateIn: (props: TickPathAnimProps) => {
    const delay = props.id * 0.0045
    return {
      stroke: props.color,
      strokeWidth: 1,
      strokeOpacity: 1,
      fillOpacity: 0,
      fill: props.color,
      transform: 'scale(1)',
      transition: {
        delay,
      },
    }
  },
  wheelLoaded: (props: TickPathAnimProps) => {
    return {
      stroke: props.color,
      strokeWidth: 1,
      strokeOpacity: 0.5,
      fillOpacity: 0,
      filter: 'grayscale(40%)',
      // strokeOpacity: 1,
      // fillOpacity: 1,
      // filter: 'grayscale(0%) url(#bright-neon-glow)',
      fill: props.color,
      transform: 'scale(1)',
      transition: {
        fillOpacity: {
          type: 'tween',
          ease: 'easeOut',
          duration: 0.5,
        },
        transform: transitions.softBounce,
      },
    }
  },
  limitReached: (props: TickPathAnimProps) => ({
    fillOpacity: 1,
    strokeWidth: 1,
    strokeOpacity: 1,
    stroke: props.color,
    fill: props.color,
    cursor: 'not-allowed',
    filter: 'brightness(30%)',
    transform: 'scale(1)',
    transition: {
      type: 'tween',
      ease: 'linear',
      duration: 0.15,
    },
  }),
  existsInQueue: (props: TickPathAnimProps) => ({
    fill: props.color,
    stroke: props.color,
    cursor: 'not-allowed',
    fillOpacity: 1,
    strokeOpacity: 1,
    strokeWidth: 1,
    transform: 'scale(1.08)',
    filter: 'grayscale(0%)',
    transition: {
      type: 'tween',
      ease: 'linear',
      duration: 0.15,
    },
  }),
  // existsInQueue: (props: TickPathAnimProps) => ({
  //   stroke: 'rgba(0, 0, 0, 1)',
  //   fill: props.color,
  //   cursor: 'not-allowed',
  //   fillOpacity: 1,
  //   strokeOpacity: 0.18,
  //   strokeWidth: 3,
  //   transform: 'scale(1.08)',
  //   filter: 'grayscale(0%)',
  //   transition: {
  //     type: 'tween',
  //     ease: 'linear',
  //     duration: 0.15,
  //   },
  // }),
  colorHovered: {
    fillOpacity: 1,
    strokeOpacity: 1,
    transform: 'scale(1.02)',
    filter: 'grayscale(0%) url(#tick-glow)',
    transition: {
      type: 'tween',
      ease: 'easeOut',
      duration: 0.125,
    },
  },
  // colorHovered: {
  //   fillOpacity: 1,
  //   strokeWidth: 1,
  //   strokeOpacity: 1,
  //   transform: 'scale(1.02)',
  //   filter: 'grayscale(0%)',
  //   transition: {
  //     type: 'tween',
  //     ease: 'easeOut',
  //     duration: 0.125,
  //   },
  // },
  colorSelected: {
    fillOpacity: 1,
    strokeOpacity: 1,
    transform: 'scale(1.02)',
    filter: 'grayscale(0%) url(#tick-glow)',
    transition: {
      type: 'tween',
      ease: 'easeOut',
      duration: 0.125,
    },
  },
}

export const circleCountdownVariants: Variants = {
  initial: (props: CountdownCircleAnimProps) => ({
    strokeOpacity: 0,
    pathLength: props.percent,
    transform: 'rotate(-90deg)',
  }),
  animateIn: (props: CountdownCircleAnimProps) => ({
    strokeOpacity: 1,
    pathLength: props.percent,
    // stroke: '#E7EEF1',
    stroke: '#1f212ccc',
    transition: {
      stroke: {
        type: 'tween',
        ease: 'easeOut',
        duration: 1,
        delay: props.delay,
      },
      pathLength: {
        type: 'tween',
        ease: 'easeOut',
        duration: 0.15,
        delay: props.delay,
      },
      strokeOpacity: {
        type: 'tween',
        ease: 'easeOut',
        duration: 1,
        delay: props.delay,
      },
    },
  }),
  exit: {
    strokeOpacity: 0,
    fillOpacity: 0,
    transition: {
      type: 'tween',
      ease: 'easeOut',
      duration: 0.3,
    },
  },
}

export const wheelLoaderVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      type: 'tween',
      ease: 'easeOut',
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      type: 'tween',
      ease: 'easeOut',
      duration: 0.3,
    },
  },
}

export const wheelNoEntriesVariants: Variants = {
  initial: {
    y: '-50px',
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'tween',
      ease: 'easeOut',
      duration: 0.3,
    },
  },
  exit: {
    y: '50px',
    opacity: 0,
    transition: {
      type: 'tween',
      ease: 'easeOut',
      duration: 0.3,
    },
  },
}
