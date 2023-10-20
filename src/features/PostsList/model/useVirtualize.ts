import { useState, useLayoutEffect, useMemo } from 'react';

interface VirtualItem {
  index: number;
  offset: number;
}

interface UseVirtualizeArgs<T extends Element> {
  containerRef: React.RefObject<T>;
  elementHight: number;
  elemsCount: number;
  gap?: number;
  overscan?: number;
}

export const useVirtualize = <T extends Element>(args: UseVirtualizeArgs<T>): VirtualItem[] => {
  const { containerRef, elementHight, elemsCount, gap = 0, overscan = 3 } = args;

  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const currContainerHeight = container?.clientHeight;
    if (!container) return;
    if (containerHeight === 0 && currContainerHeight) setContainerHeight(currContainerHeight);

    const handleScroll = () => {
      setScrollTop(container.scrollTop);
    };

    handleScroll();

    container.addEventListener('scroll', handleScroll);

    return () => container.removeEventListener('scroll', handleScroll);
  }, [containerRef, containerHeight]);

  const { startIdx, endIdx } = useMemo(() => {
    const rangeStart = scrollTop;
    const rangeEnd = scrollTop + containerHeight;

    let startIdx = Math.floor(rangeStart / (elementHight + gap)) - overscan;
    let endIdx = Math.ceil(rangeEnd / (elementHight + gap)) + overscan;

    if (startIdx < 0) startIdx = 0;
    if (endIdx >= elemsCount) endIdx = elemsCount - 1;

    // console.log('containerHeight', containerHeight);
    return { startIdx, endIdx };
  }, [scrollTop, containerHeight, elemsCount, elementHight, overscan, gap]);

  // console.log('startIdx', startIdx);
  // console.log('endIdx', endIdx);
  // console.log('endIdx - startIdx', endIdx - startIdx);

  const virtualItems: VirtualItem[] = [];

  for (let i = startIdx; i <= endIdx; i++) {
    virtualItems.push({
      index: i,
      offset: i * (elementHight + gap),
    });
  }

  return virtualItems;
};
