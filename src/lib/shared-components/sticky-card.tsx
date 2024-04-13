import { Card, CardHeader, CardContent, CardFooter } from '@/lib/ui/card';
import { Skeleton } from '@/lib/ui/skeleton';
import { cn } from '@/lib/ui-utils';

function StickyCardHeader(props: React.ComponentProps<typeof CardHeader>) {
  return <CardHeader className="gap-8" {...props} />;
}

function StickyCardHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl font-black uppercase tracking-wide">{children}</h2>
  );
}

function StickyCardSkeleton() {
  return (
    <>
      <StickyCardHeader>
        <Skeleton className="h-10 w-2/3" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-6 w-[82%]" />
          <Skeleton className="h-6 w-[25%]" />
        </div>
      </StickyCardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-10 w-full" />
        </div>
      </CardContent>
      <CardFooter>
        <Skeleton className="h-14 w-1/2 rounded-full" />
      </CardFooter>
    </>
  );
}

type StickyCardProps = {
  className?: string;
  isPending?: boolean;
  children: React.ReactNode;
};

function StickyCard({ className, isPending, children }: StickyCardProps) {
  return (
    <Card className={cn('sticky top-32 shadow-xl', className)}>
      {isPending ? <StickyCardSkeleton /> : children}
    </Card>
  );
}

export {
  StickyCard,
  StickyCardHeader,
  StickyCardHeading,
  CardContent as StickyCardContent,
  CardFooter as StickyCardFooter,
};
