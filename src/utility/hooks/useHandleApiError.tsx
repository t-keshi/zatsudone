import { onlineManager } from 'react-query';
import { useSnackbar } from '../../containers/contexts/snackbar';

type UseHandleApiErrorReturnType = (error: Error, errorMessage: string) => void;

export const useHandleApiError = (): UseHandleApiErrorReturnType => {
  const [, snackbarDispatch] = useSnackbar();
  const isOnline = onlineManager.isOnline();
  const handleApiError = (error: Error, errorMessage: string) => {
    if (!isOnline) {
      return snackbarDispatch({
        type: 'open',
        payload: {
          severity: 'warning',
          message: 'インターネット接続がありません',
        },
      });
    }
    if (error.message === 'The caller does not have permission') {
      return snackbarDispatch({
        type: 'open',
        payload: { severity: 'error', message: 'ログインしてください' },
      });
    }

    return snackbarDispatch({
      type: 'open',
      payload: { severity: 'error', message: errorMessage },
    });
  };

  return handleApiError;
};
