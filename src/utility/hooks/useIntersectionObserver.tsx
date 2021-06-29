import { useEffect } from 'react';

interface Props {
  target: React.RefObject<Element>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onIntersect: () => any;
  threshold?: number;
  rootMargin?: string;
  enabled?: boolean;
}

export const useIntersectionObserver = ({
  target,
  onIntersect,
  threshold = 1.0,
  rootMargin = '0px',
  enabled = true,
}: Props): void => {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) =>
        entries.forEach(
          (entry: IntersectionObserverEntry) =>
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            entry.isIntersecting && onIntersect(),
        ),
      {
        rootMargin,
        threshold,
      },
    );

    const el = target && target.current;

    if (!el) {
      return;
    }

    observer.observe(el);

    // eslint-disable-next-line consistent-return
    return () => {
      observer.unobserve(el);
    };
  }, [enabled, rootMargin, threshold, target, onIntersect]);
};
