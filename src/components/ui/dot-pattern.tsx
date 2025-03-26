import React from 'react';
import { cn } from '@/lib/utils';

interface DotPatternProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  spacing?: number;
  dotSize?: number;
  opacity?: number;
  className?: string;
  [key: string]: unknown;
}

export function DotPattern({
  size = 16,
  spacing = 16,
  dotSize = 1,
  opacity = 0.05,
  className,
  ...props
}: DotPatternProps) {
  const id = React.useId();

  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full",
        className,
      )}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={spacing}
          height={spacing}
          patternUnits="userSpaceOnUse"
          patternContentUnits="userSpaceOnUse"
        >
          <circle
            cx={spacing / 2}
            cy={spacing / 2}
            r={dotSize}
            fill="currentColor"
            fillOpacity={opacity}
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
