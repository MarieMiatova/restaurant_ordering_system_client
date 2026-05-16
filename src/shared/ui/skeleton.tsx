import { clsx } from 'clsx';
import type { JSX } from 'react';

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
}

export function Skeleton({ 
  className, 
  width = '100%', 
  height = '1rem',
  borderRadius = '0.375rem'
}: SkeletonProps): JSX.Element {
  return (
    <div
      className={clsx(
        'animate-pulse bg-gray-200 dark:bg-gray-700',
        className
      )}
      style={{ width, height, borderRadius }}
    />
  );
}
