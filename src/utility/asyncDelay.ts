export const asyncDelay = (ms: number, multiple = 1): Promise<() => void> =>
  new Promise((resolve) => setTimeout(resolve, ms * multiple));
