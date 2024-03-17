import * as React from 'react';

import { cn } from '@/lib/utils';

export interface TitleProps
  extends React.InputHTMLAttributes<HTMLHeadingElement> {
  component: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const Title = React.forwardRef<HTMLHeadingElement, TitleProps>(
  ({ className, component: Component = 'h1', ...props }, ref) => {
    return (
      <Component
        className={cn(
          'text-4xl font-black uppercase tracking-wider',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Title.displayName = 'Title';

export { Title };
