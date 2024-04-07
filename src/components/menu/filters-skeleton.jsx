import { Skeleton } from '@/components/ui/skeleton';

function FiltersSkeleton() {
  return (
    <>
      <Skeleton className="h-10 w-full" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-20" />
      </div>
    </>
  );
}

export { FiltersSkeleton };
