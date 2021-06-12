import React from 'react';

type ReturnType = [string, (e: React.ChangeEvent<{ value: unknown }>) => void];

export const useSelect = (initialValue = ''): ReturnType => {
  const [selectValue, setSelectValue] = React.useState(initialValue);
  const handleSelectValue = (e: React.ChangeEvent<{ value: unknown }>) => {
    setSelectValue(e.target.value as string);
  };

  return [selectValue, handleSelectValue];
};
