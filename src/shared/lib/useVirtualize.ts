import { useState, useLayoutEffect, useMemo } from 'react';

interface IVirtualItem {
  index: number;
  offset: number;
}

interface IUseVirtualizeArgs<T extends Element> {
  containerRef: React.RefObject<T>;
  elementHight: number;
  elemsCount: number;
  gap?: number;
  overscan?: number;
}

interface IUseVirtualizeValues {
  virtualItems: IVirtualItem[];
  fullHeight: number;
}

export const useVirtualize = <T extends Element>(args: IUseVirtualizeArgs<T>): IUseVirtualizeValues => {
  const { containerRef, elementHight, elemsCount, gap = 0, overscan = 3 } = args;

  const elementHeightWithGap = elementHight + gap;
  const fullHeight = elemsCount * elementHeightWithGap - gap;

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

    const ro = new ResizeObserver(([entry]) => {
      setContainerHeight(entry.contentRect.height || entry.target.getBoundingClientRect().height);
    });

    ro.observe(container);

    return () => {
      ro.disconnect();
      container.removeEventListener('scroll', handleScroll);
    };
  }, [containerRef, containerHeight]);

  const { startIdx, endIdx } = useMemo(() => {
    const rangeStart = scrollTop;
    const rangeEnd = scrollTop + containerHeight;

    let startIdx = Math.floor(rangeStart / elementHeightWithGap) - overscan;
    let endIdx = Math.ceil(rangeEnd / elementHeightWithGap) + overscan;

    if (startIdx < 0) startIdx = 0;
    if (endIdx >= elemsCount) endIdx = elemsCount - 1;

    return { startIdx, endIdx };
  }, [scrollTop, containerHeight, elemsCount, overscan, elementHeightWithGap]);

  const virtualItems: IVirtualItem[] = [];

  for (let i = startIdx; i <= endIdx; i++) {
    virtualItems.push({
      index: i,
      offset: i * elementHeightWithGap,
    });
  }

  return { virtualItems, fullHeight };
};
