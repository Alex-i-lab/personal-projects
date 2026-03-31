import React from 'react';
import { cn } from '@/src/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'rectangular' | 'circular' | 'text';
}

export const Skeleton: React.FC<SkeletonProps> = ({ 
  className, 
  variant = 'rectangular' 
}) => {
  return (
    <div 
      className={cn(
        "animate-pulse bg-black/5",
        variant === 'circular' ? "rounded-full" : "rounded-2xl",
        variant === 'text' ? "h-4 w-full" : "",
        className
      )}
    />
  );
};
