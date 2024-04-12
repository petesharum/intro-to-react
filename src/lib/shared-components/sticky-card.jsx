import { forwardRef } from 'react';

import { Card, CardHeader, CardContent, CardFooter } from '@/lib/ui/card';
import { cn } from '@/lib/ui-utils';

const StickyCard = forwardRef(({ className, children }, ref) => {
  return (
    <Card className={cn('sticky top-32 shadow-xl', className)} ref={ref}>
      {children}
    </Card>
  );
});
StickyCard.displayName = 'StickyCard';

function StickyCardHeader(props) {
  return <CardHeader className="gap-8" {...props} />;
}

export {
  StickyCard,
  StickyCardHeader,
  CardContent as StickyCardContent,
  CardFooter as StickyCardFooter,
};
