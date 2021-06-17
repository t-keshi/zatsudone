import { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';

export const usePageScrollReset = (): void => {
  const { hash } = useLocation();
  const { action } = useHistory();

  useEffect(() => {
    if (!hash || action !== 'POP') {
      window.scroll(0, 0);
    }
  }, [action, hash]);
};
