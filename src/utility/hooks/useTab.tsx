import { useState } from 'react';
import { useDeviceInfo } from './useDeviceInfo';

interface ReturnType {
  tabIndex: number;
  handleChangeTab: (_: unknown, index: number) => void;
  handleChangeTabBySwipe: (index: number) => void;
}

export const useTab = (initialTabIndex = 0): ReturnType => {
  const device = useDeviceInfo();
  const [tabIndex, setTabIndex] = useState(initialTabIndex);
  const handleChangeTab = (_: unknown, index: number) => {
    setTabIndex(index);
  };
  const handleChangeTabBySwipe = (index: number) => {
    setTabIndex(index);
  };

  return { tabIndex, handleChangeTab, handleChangeTabBySwipe };
};
