import { useCallback, useState } from 'react';

interface Functions<T> {
  set: (items: T[]) => void;
  push: (item: T) => void;
  unshift: (item: T) => void;
  removeIndex: (index: number) => void;
  toggle: (newItem: T, findBy: (item: T) => boolean) => void;
  replace: (newValue: T, findBy: (item: T) => boolean) => void;
  remove: (findBy: (item: T) => boolean) => void;
  clear: () => void;
}

export const useArray = <TArrayItem,>(
  initialValue: TArrayItem[],
): [TArrayItem[], Functions<TArrayItem>] => {
  const [array, setArray] = useState<TArrayItem[]>(initialValue);
  // 末尾に追加
  const push = useCallback((item: TArrayItem) => {
    setArray((prevArray) => [...prevArray, item]);
  }, []);
  // 先頭に追加
  const unshift = useCallback((item: TArrayItem) => {
    setArray((prevArray) => [item, ...prevArray]);
  }, []);
  // indexを指定して削除
  const removeIndex = useCallback((index: number) => {
    setArray((prevArray) => {
      prevArray.splice(index, 1);

      return [...prevArray];
    });
  }, []);
  // 存在する場合は配列から削除、存在しない場合は追加
  const toggle = useCallback(
    (newItem: TArrayItem, findBy: (item: TArrayItem) => boolean) => {
      setArray((prevArray) => {
        const copy = [...prevArray];
        const index = copy.findIndex((item) => findBy(item));
        if (index > -1) {
          copy.splice(index, 1);
        } else {
          copy.push(newItem);
        }

        return copy;
      });
    },
    [],
  );
  // 存在する場合は置換
  const replace = useCallback(
    (newItem: TArrayItem, findBy: (item: TArrayItem) => boolean) => {
      setArray((prevArray) => {
        const copy = [...prevArray];
        const index = copy.findIndex((item) => findBy(item));
        if (index > -1) {
          copy[index] = newItem;
        }

        return copy;
      });
    },
    [],
  );
  // 存在する場合は削除
  const remove = useCallback((findBy: (item: TArrayItem) => boolean) => {
    setArray((prevArray) => {
      const copy = [...prevArray];
      const index = copy.findIndex((item) => findBy(item));
      if (index > -1) {
        copy.splice(index, 1);
      }

      return copy;
    });
  }, []);
  const clear = useCallback(() => setArray([]), []);

  return [
    array,
    {
      set: setArray,
      push,
      unshift,
      removeIndex,
      toggle,
      replace,
      remove,
      clear,
    },
  ];
};
