import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function ProductCardSkeleton() {
  return (
    <Card className="sticky top-32 shadow-xl">
      <CardHeader className="gap-8">
        <Skeleton className="h-10 w-2/3" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-6 w-[82%]" />
          <Skeleton className="h-6 w-[25%]" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-10 w-full" />
        </div>
      </CardContent>
      <CardFooter>
        <Skeleton className="h-14 w-1/2 rounded-full" />
      </CardFooter>
    </Card>
  );
}

export { ProductCardSkeleton };
