import { useState, useEffect, useCallback } from 'react';
import { cn } from '@shared/lib/cn';

interface ImageWithSkeletonProps {
  src?: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  onError?: () => void;
}

export function ImageWithSkeleton({
  src,
  alt,
  className,
  containerClassName,
  onError,
}: ImageWithSkeletonProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [loadedSrc, setLoadedSrc] = useState<string | undefined>(src);

  useEffect(() => {
    if (src !== loadedSrc) {
      setIsLoading(true);
      setHasError(false);
      setLoadedSrc(src);
    }
  }, [src, loadedSrc]);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
    setHasError(false);
  }, []);

  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  }, [onError]);

  const showImage = !hasError && loadedSrc;

  return (
    <div className={cn('relative overflow-hidden', containerClassName)}>
      {/* Skeleton loader */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
      )}

      {/* Image */}
      {showImage ? (
        <img
          src={loadedSrc}
          alt={alt}
          className={cn('w-full h-full object-cover', className)}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
        />
      ) : (
        /* Fallback placeholder */
        <div className={cn('w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500', className)}>
          <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      )}
    </div>
  );
}
