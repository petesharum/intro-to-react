import * as React from 'react';

import { cn } from '@/lib/utils';

const Title = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  return (
    <h1
      className={cn('text-4xl font-black uppercase tracking-wider', className)}
      ref={ref}
      {...props}
    />
  );
});
Title.displayName = 'Title';

export { Title };
