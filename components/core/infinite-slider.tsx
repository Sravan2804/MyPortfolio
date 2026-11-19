'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

export type InfiniteSliderProps = {
  children: React.ReactNode;
  gap?: number;
  duration?: number;
  durationOnHover?: number;
  speedOnHover?: number;
  direction?: 'horizontal' | 'vertical';
  reverse?: boolean;
  className?: string;
};

export function InfiniteSlider({
  children,
  gap = 16,
  duration = 25,
  durationOnHover,
  speedOnHover,
  direction = 'horizontal',
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [contentSize, setContentSize] = useState(0);
  const [containerSize, setContainerSize] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const isVertical = direction === 'vertical';

  // Measure container and content size with ResizeObserver
  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    const updateMeasurements = () => {
      const containerRect = container.getBoundingClientRect();
      const contentRect = content.getBoundingClientRect();

      const newContainerSize = isVertical ? containerRect.height : containerRect.width;
      const newContentSize = isVertical ? contentRect.height : contentRect.width;

      if (newContainerSize > 0) setContainerSize(newContainerSize);
      if (newContentSize > 0) setContentSize(newContentSize);
    };

    updateMeasurements();

    const resizeObserver = new ResizeObserver(updateMeasurements);
    resizeObserver.observe(container);
    resizeObserver.observe(content);

    return () => resizeObserver.disconnect();
  }, [isVertical, children]);

  // Smooth continuous animation using requestAnimationFrame
  useEffect(() => {
    const track = trackRef.current;
    if (!track || contentSize <= 0) return;

    let rafId: number;
    let lastTime = performance.now();
    let currentOffset = 0;

    const totalDistance = contentSize + gap;

    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Calculate speed in pixels per second
      const baseSpeed = totalDistance / Math.max(duration, 0.1);
      let activeSpeed = baseSpeed;

      if (isHovered) {
        if (speedOnHover !== undefined) {
          activeSpeed = speedOnHover;
        } else if (durationOnHover !== undefined) {
          activeSpeed = totalDistance / Math.max(durationOnHover, 0.1);
        }
      }

      const step = activeSpeed * dt;

      if (reverse) {
        currentOffset += step;
        if (currentOffset >= 0) {
          currentOffset -= totalDistance;
        }
      } else {
        currentOffset -= step;
        if (currentOffset <= -totalDistance) {
          currentOffset += totalDistance;
        }
      }

      if (isVertical) {
        track.style.transform = `translate3d(0, ${currentOffset}px, 0)`;
      } else {
        track.style.transform = `translate3d(${currentOffset}px, 0, 0)`;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, [contentSize, gap, duration, durationOnHover, speedOnHover, isHovered, isVertical, reverse]);

  // Determine how many repetitions are needed to fully span the viewport without gaps
  const repeatCount = contentSize > 0 && containerSize > 0
    ? Math.max(2, Math.ceil(containerSize / (contentSize + gap)) + 1)
    : 3;

  const handleMouseEnter = useCallback(() => {
    if (speedOnHover !== undefined || durationOnHover !== undefined) {
      setIsHovered(true);
    }
  }, [speedOnHover, durationOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (speedOnHover !== undefined || durationOnHover !== undefined) {
      setIsHovered(false);
    }
  }, [speedOnHover, durationOnHover]);

  return (
    <div
      ref={containerRef}
      className={cn('relative overflow-hidden', className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={trackRef}
        className={cn('flex will-change-transform', isVertical ? 'flex-col' : 'flex-row')}
        style={{
          gap: `${gap}px`,
        }}
      >
        <div
          ref={contentRef}
          className={cn(
            'flex shrink-0 items-center',
            isVertical ? 'flex-col' : 'flex-row'
          )}
          style={{
            gap: `${gap}px`,
          }}
        >
          {children}
        </div>

        {Array.from({ length: repeatCount }).map((_, i) => (
          <div
            key={i}
            aria-hidden="true"
            className={cn(
              'flex shrink-0 items-center select-none',
              isVertical ? 'flex-col' : 'flex-row'
            )}
            style={{
              gap: `${gap}px`,
            }}
          >
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}

export default InfiniteSlider;
