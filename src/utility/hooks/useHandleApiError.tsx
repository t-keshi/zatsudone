import { onlineManager } from 'react-query';

type UseHandleApiErrorReturnType = (error: Error, errorMessage: string) => void;

export const useHandleApiError = (): UseHandleApiErrorReturnType => {
  const isOnline = onlineManager.isOnline();
  if (!isOnline) {
    // TODO: スナックバーでアラートを出す処理
  }
  const handleApiError = (error: Error, errorMessage: string) => {
    console.error(error, errorMessage);
  };

  return handleApiError;
};
