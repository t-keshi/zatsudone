import { RefObject, useLayoutEffect, useState } from 'react';
import screenfull from 'screenfull';
import { noop } from '../misc';

export interface FullScreenOptions {
  onClose?: (error?: Error) => void;
}

export const useFullscreen = (
  ref: RefObject<Element>,
  enabled: boolean,
  options: FullScreenOptions = {},
): boolean => {
  const { onClose = noop } = options;
  const [isFullscreen, setIsFullscreen] = useState(enabled);

  useLayoutEffect(() => {
    if (!enabled) {
      return;
    }
    if (!ref) {
      return;
    }
    if (!ref.current) {
      return;
    }

    const onChange = () => {
      if (screenfull.isEnabled) {
        const isScreenfullFullscreen = screenfull.isFullscreen;
        setIsFullscreen(isScreenfullFullscreen);
        if (!isScreenfullFullscreen) {
          onClose();
        }
      }
    };

    if (screenfull.isEnabled) {
      try {
        void screenfull.request(ref.current);
        setIsFullscreen(true);
      } catch (error) {
        onClose(error);
        setIsFullscreen(false);
      }
      screenfull.on('change', onChange);
    } else {
      onClose();
      setIsFullscreen(false);
    }

    // eslint-disable-next-line consistent-return
    return () => {
      setIsFullscreen(false);
      if (screenfull.isEnabled) {
        try {
          screenfull.off('change', onChange);
          void screenfull.exit();
        } catch {
          console.warn('can not cleanup screenfullFunction');
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, ref]);

  return isFullscreen;
};
