import { useEffect, useState } from 'react';

import debounce from '../utils/debounce';

export default function useScroll(elementRef) {
  const [scrollPos, setScrollPos] = useState({ x: 0, y: 0, top: 0 });

  const onScroll = debounce(() => {
    const { scrollX, scrollY, scrollTop } = elementRef.current || window;
    if (
      scrollPos.x !== scrollX ||
      scrollPos.y !== scrollY ||
      scrollPos.top !== scrollTop
    ) {
      setScrollPos({ x: scrollX, y: scrollY, top: scrollTop });
    }
  }, 10);

  useEffect(() => {
    const element = elementRef.current || window;
    (element || window).addEventListener('scroll', onScroll);
    return () => {
      (element || window).removeEventListener('scroll', onScroll);
    };
  }, [elementRef, onScroll]);

  return [scrollPos.x, scrollPos.y, scrollPos.top];
}
