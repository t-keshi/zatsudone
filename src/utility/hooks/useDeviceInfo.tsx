import { useMemo } from 'react';

type Device = 'mobile' | 'tablet' | 'pc';

export const useDeviceInfo = (): Device => {
  const detectDevice = () => {
    const ua = window.navigator.userAgent.toLowerCase();
    if (
      ua.indexOf('iphone') > 0 ||
      ua.indexOf('ipod') > 0 ||
      (ua.indexOf('android') > 0 && ua.indexOf('mobile') > 0)
    ) {
      return 'mobile';
    }
    if (
      ua.indexOf('ipad') > 0 ||
      ua.indexOf('android') > 0 ||
      // NOTE: iOS13.0以上とiPadOSはipadでもmacintoshになる
      (ua.indexOf('macintosh') > -1 && 'ontouchend' in document)
    ) {
      return 'tablet';
    }

    return 'pc';
  };

  return useMemo(() => detectDevice(), []);
};
