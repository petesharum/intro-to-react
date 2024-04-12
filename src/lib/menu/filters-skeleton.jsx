import { Skeleton } from '@/lib/ui/skeleton';

function FiltersSkeleton() {
  return (
    <>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-20" />
      </div>
    </>
  );
}

export { FiltersSkeleton };
