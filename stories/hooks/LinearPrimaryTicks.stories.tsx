import { Meta } from '@storybook/react';
import { scaleLinear } from 'd3-scale';
import { useEffect, useState } from 'react';

import { LinearHorizontalAxis, LinearVerticalAxis } from './TestAxis';

interface Props {
  minSize: number;
  maxSize: number;
  minValue: number;
  maxValue: number;
  speedAnimation: number;
  scientificNotation: boolean;
}

export default {
  title: 'Hooks/useLinearPrimaryTicks',
  args: {
    minSize: 50,
    maxSize: 500,
    minValue: 0,
    maxValue: 100,
    speedAnimation: 0.75,
    scientificNotation: false,
  },
} as Meta;

export function AutomaticHorizontalAxis({
  minSize,
  maxSize,
  minValue,
  maxValue,
  speedAnimation,
  scientificNotation,
}: Props) {
  const [width, setWidth] = useState(minSize);
  const [isDown, setIsDown] = useState(true);

  const scale = scaleLinear().range([0, width]).domain([minValue, maxValue]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setWidth((prevWidth) => {
        if (prevWidth <= minSize && isDown) {
          setIsDown(false);
        } else if (prevWidth >= maxSize && !isDown) {
          setIsDown(true);
        }
        return isDown ? prevWidth - speedAnimation : prevWidth + speedAnimation;
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [width, isDown, minSize, maxSize, speedAnimation]);

  return (
    <div>
      <svg style={{ overflow: 'visible' }} width={maxSize + 20} height={60}>
        <LinearHorizontalAxis
          x={10}
          y={10}
          scale={scale}
          width={width}
          scientificNotation={scientificNotation}
        />
      </svg>
    </div>
  );
}
AutomaticHorizontalAxis.storyName = 'Automatic horizontal axis';

export function AutomaticVerticalAxis({
  minSize,
  maxSize,
  minValue,
  maxValue,
  speedAnimation,
  scientificNotation,
}: Props) {
  const [height, setHeight] = useState(minSize);
  const [isDown, setIsDown] = useState(true);

  const scale = scaleLinear().range([height, 0]).domain([minValue, maxValue]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setHeight((prevHeight) => {
        if (prevHeight <= minSize && isDown) {
          setIsDown(false);
        } else if (prevHeight >= maxSize && !isDown) {
          setIsDown(true);
        }
        return isDown
          ? prevHeight - speedAnimation
          : prevHeight + speedAnimation;
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [height, isDown, minSize, maxSize, speedAnimation]);

  return (
    <div>
      <svg style={{ overflow: 'visible' }} height={maxSize + 20} width={60}>
        <LinearVerticalAxis
          x={10}
          y={10}
          scale={scale}
          height={height}
          scientificNotation={scientificNotation}
        />
      </svg>
    </div>
  );
}
AutomaticVerticalAxis.storyName = 'Automatic vertical axis';