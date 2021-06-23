import React, { useCallback, useEffect, useRef, useState } from 'react';

const DEFAULT_DEBOUNCE_MILL_SECOND = 500;

type UseDebounceInput = () => {
  value: string;
  debounceValue: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClearInput: () => void;
};

export const useDebounceInput: UseDebounceInput = () => {
  const [value, setValue] = useState<string>('');
  const [debounceValue, setDebounceValue] = useState<string>('');
  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
    [],
  );
  const handleClearInput = useCallback(() => setValue(''), []);
  const handleDebounceInput = useCallback(
    (inputValue) => setDebounceValue(inputValue),
    [],
  );
  // ---------- timeout ----------
  const timeout: React.MutableRefObject<NodeJS.Timeout | undefined> = useRef<
    ReturnType<typeof setTimeout>
  >();
  const set = useCallback(() => {
    // タイマーがすでにセットされている場合、カウントをリセットする
    if (typeof timeout.current !== 'undefined') {
      clearTimeout(timeout.current);
    }
    // タイマーがまだセットされていない場合、新しいタイマーをセットする
    timeout.current = setTimeout(() => {
      handleDebounceInput(value);
    }, 300);
  }, [handleDebounceInput, value]);
  const clear = useCallback(() => {
    if (typeof timeout.current !== 'undefined') {
      clearTimeout(timeout.current);
    }
  }, []);

  useEffect(() => {
    set();

    return clear;
  }, [clear, set]);

  return { value, debounceValue, setValue, handleInput, handleClearInput };
};
