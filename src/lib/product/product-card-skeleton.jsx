import { Skeleton } from '@/lib/ui/skeleton';

import {
  StickyCard,
  StickyCardHeader,
  StickyCardContent,
  StickyCardFooter,
} from '../shared-components/sticky-card';

function ProductCardSkeleton() {
  return (
    <StickyCard>
      <StickyCardHeader>
        <Skeleton className="h-10 w-2/3" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-6 w-[82%]" />
          <Skeleton className="h-6 w-[25%]" />
        </div>
      </StickyCardHeader>
      <StickyCardContent>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-10 w-full" />
        </div>
      </StickyCardContent>
      <StickyCardFooter>
        <Skeleton className="h-14 w-1/2 rounded-full" />
      </StickyCardFooter>
    </StickyCard>
  );
}

export { ProductCardSkeleton };
