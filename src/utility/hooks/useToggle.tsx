import { Reducer, useReducer } from 'react';

const toggleReducer = (state: boolean, nextValue?: boolean) =>
  typeof nextValue === 'boolean' ? nextValue : !state;

export const useToggle = (
  initialValue: boolean,
): [boolean, (nextValue?: boolean) => void] =>
  useReducer<Reducer<boolean, boolean | undefined>>(
    toggleReducer,
    initialValue,
  );
