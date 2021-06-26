import React from 'react';

type ReturnType<TSelectValue> = [
  TSelectValue,
  (e: React.ChangeEvent<{ value: unknown }>) => void,
];

export const useSelect = <TSelectValue,>(
  initialValue: TSelectValue,
): ReturnType<TSelectValue> => {
  const [selectValue, setSelectValue] = React.useState(initialValue);
  const handleSelectValue = (e: React.ChangeEvent<{ value: unknown }>) => {
    setSelectValue(e.target.value as TSelectValue);
  };

  return [selectValue, handleSelectValue];
};
