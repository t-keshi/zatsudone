import { createContext, createElement, useContext, useState } from 'react';

type UseStateContextReturnType<T> = () => [
  T,
  React.Dispatch<React.SetStateAction<T>>,
];
type StateProviderReturnType<T> = React.FC<{
  initialValue?: T | undefined;
}>;
type ContextReturnType<T> = React.Context<
  [T, React.Dispatch<React.SetStateAction<T>>] | undefined
>;

export const createStateContext = <T,>(
  defaultInitialValue: T,
): Readonly<
  [
    UseStateContextReturnType<T>,
    StateProviderReturnType<T>,
    ContextReturnType<T>,
  ]
> => {
  const context = createContext<
    [T, React.Dispatch<React.SetStateAction<T>>] | undefined
  >(undefined);
  const providerFactory = (
    props: { value: [T, React.Dispatch<React.SetStateAction<T>>] },
    children: React.ReactNode,
  ) => createElement(context.Provider, props, children);
  const StateProvider: React.FC<{ initialValue?: T }> = ({
    children,
    initialValue,
  }) => {
    const state = useState<T>(
      initialValue !== undefined ? initialValue : defaultInitialValue,
    );

    return providerFactory({ value: state }, children);
  };
  const useStateContext = () => {
    const state = useContext(context);
    if (state == null) {
      throw new Error(`useStateContext must be used inside a StateProvider.`);
    }

    return state;
  };

  return [useStateContext, StateProvider, context] as const;
};
