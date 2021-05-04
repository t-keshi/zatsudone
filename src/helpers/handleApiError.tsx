import { onlineManager } from 'react-query';

export const handleApiError = (error: Error, errorMessage: string): never => {
  const isOnline = onlineManager.isOnline();
  if (!isOnline) {
    // TODO: スナックバーでアラートを出す処理
  }

  throw new Error(errorMessage);
};
