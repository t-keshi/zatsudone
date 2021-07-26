import { useRef } from 'react';

export const useScrollBlock = (): [() => void, () => void] => {
  const scrollBlocked = useRef<boolean>(true);
  const html = document.documentElement;
  const { body } = document;

  const blockScroll = () => {
    if (!body || !body.style || scrollBlocked.current) return;

    const scrollBarWidth = window.innerWidth - html.clientWidth;
    const bodyPaddingRight =
      parseInt(
        window.getComputedStyle(body).getPropertyValue('padding-right'),
        10,
      ) || 0;

    body.style.overflow = 'hidden';
    body.style.paddingRight = `${bodyPaddingRight + scrollBarWidth}px`;

    scrollBlocked.current = true;
  };

  const allowScroll = () => {
    if (!body || !body.style || !scrollBlocked.current) return;

    body.style.overflow = '';
    body.style.paddingRight = '';

    scrollBlocked.current = false;
  };

  return [blockScroll, allowScroll];
};
