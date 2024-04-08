import { forwardRef } from 'react';

import { Card } from '@/lib/ui/card';
import { cn } from '@/lib/ui-utils';

const StickyCard = forwardRef(({ className, children }, ref) => {
  return (
    <Card className={cn('sticky top-32 shadow-xl', className)} ref={ref}>
      {children}
    </Card>
  );
});
StickyCard.displayName = 'StickyCard';

export { StickyCard };
