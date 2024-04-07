import { forwardRef } from 'react';

import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const StickyCard = forwardRef(({ className, children }, ref) => {
  return (
    <Card className={cn('sticky top-32 shadow-xl', className)} ref={ref}>
      {children}
    </Card>
  );
});
StickyCard.displayName = 'StickyCard';

export { StickyCard };
