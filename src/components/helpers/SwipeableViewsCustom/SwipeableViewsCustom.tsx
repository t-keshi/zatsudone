import React from 'react';
import SwipeableViews, { SwipeableViewsProps } from 'react-swipeable-views';
import { useDeviceInfo } from '../../../utility/hooks/useDeviceInfo';

interface Props {
  index: SwipeableViewsProps['index'];
  onChangeIndex: SwipeableViewsProps['onChangeIndex'];
}

export const SwipeableViewsCustom: React.FC<Props> = ({
  children,
  index,
  onChangeIndex,
}) => {
  const device = useDeviceInfo();
  const axis = device === 'pc' ? 'x-reverse' : 'x';

  return (
    <SwipeableViews axis={axis} index={index} onChangeIndex={onChangeIndex}>
      {children}
    </SwipeableViews>
  );
};
