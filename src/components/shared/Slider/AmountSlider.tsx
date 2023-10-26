import ReactSlider, { type ReactSliderProps } from 'react-slider'

import { SPACING, FARE_COLORS } from '@/design'

const SLIDER_HEIGHT = 4

const SAmountSlider = styled(ReactSlider)<ReactSliderProps | any>`
  width: 100%;
  height: 20px;
  padding-top: ${SPACING.sm}px;
  margin-top: ${SPACING.xs}px;
  /* margin-bottom: ${SPACING.md}px; */
  position: relative;
  cursor: pointer;

  > .amount-slider-track {
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    height: ${SLIDER_HEIGHT}px;
    border-radius: 2px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3), 0 0 5px rgba(0, 0, 0, 0.4);
    border-radius: 50%;

    &.amount-slider-track-0 {
      background: ${FARE_COLORS.aqua};
      height: ${SLIDER_HEIGHT}px;
    }

    &.amount-slider-track-1 {
      background: #212332;
      height: ${SLIDER_HEIGHT}px;
    }
  }

  .amount-slider-track {
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 4px;
    border-radius: 2px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3), 0 0 5px rgba(0, 0, 0, 0.4);
  }

  &:active:not(.disabled) {
    cursor: grabbing;
    .amount-slider-thumb {
      border: none;
      background: ${FARE_COLORS.blue};
      // background: linear-gradient(135deg, ${FARE_COLORS.blue}, ${FARE_COLORS.pink});
      /* background: #27ff83; */
      /* box-shadow: 0px 0px 8px #53ff0f; */
      cursor: grabbing;
      transform: scale(1.12);
    }
  }

  &.disabled {
    /* pointer-events: none; */
    cursor: not-allowed !important;

    .amount-slider-thumb {
      cursor: not-allowed !important;
      background: #212332;
      &:active {
        border: none;
        /* box-shadow: 0px 0px 0px #53ff0f !important; */
        box-shadow: 0px 0px 8px ${FARE_COLORS.salmon} !important;
        transform: scale(1) !important;
      }
      &:focus {
        border: none;
        outline: none;
      }
    }
  }
`

const SSliderThumb = styled.div`
  top: 6px;
  right: 6px;
  line-height: 20px;
  height: 20px;
  width: 4px;
  border-radius: 1px;
  text-align: center;
  color: #fff;
  // background: linear-gradient(135deg, ${FARE_COLORS.blue}, ${FARE_COLORS.pink});
  background: ${FARE_COLORS.blue};
  box-shadow: 0px 0px 0px #53ff0f;
  /* background: #27ff83; */
  /* box-shadow: 0px 0px 0px #53ff0f; */
  cursor: grab;
  transition: background, box-shadow ease-in-out 0.12s, transform ease-in-out 0.15s;
  &:active {
    border: none;
    /* background: ${FARE_COLORS.blue}; */
    background: linear-gradient(135deg, ${FARE_COLORS.blue}, ${FARE_COLORS.pink});
    box-shadow: 0px 0px 8px ${FARE_COLORS.salmon} !important;
    /* background: #27ff83; */
    /* box-shadow: 0px 0px 8px #53ff0f; */
    cursor: grabbing;
    transform: scale(1.12);
  }
  &:focus {
    border: none;
    outline: none;
  }
`

const SSliderTrack = styled.div<{ index: number }>`
  top: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.15);
`

const Thumb = (props: any, _state: any) => {
  return <SSliderThumb {...props} transition={{ type: 'spring' }} />
}

const Track = (props: any, state: any) => {
  return <SSliderTrack {...props} index={state.index} />
}

const AmountSlider = (props: ReactSliderProps) => {
  return (
    <SAmountSlider
      className="amount-slider"
      markClassName="amount-slider-mark"
      thumbClassName="amount-slider-thumb"
      trackClassName="amount-slider-track"
      min={0}
      defaultValue={0}
      renderThumb={Thumb as any}
      renderTrack={Track as any}
      {...props}
      onChange={(value: number) => {
        if ((props.max || 0) - value < (props.step || 0)) {
          props.onChange?.(props.max as number, 0)
          return
        }
        props.onChange?.(value, 0)
      }}
    />
  )
}

export default AmountSlider
