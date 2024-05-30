import { Skeleton } from '@/lib/ui/skeleton';

function FiltersSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-6 w-20" />
      <Skeleton className="h-6 w-24" />
      <Skeleton className="h-6 w-20" />
    </div>
  );
}

function CategoryFilters({ isPending, children }) {
  if (isPending) {
    return <FiltersSkeleton />;
  }

  return <ul className="flex flex-col">{children}</ul>;
}

// ⚠️ Take care when passing `onClick` to the `a` element. More often than not,
// if you don't need to navigate to a different page, you should use a `button`.
function CategoryFilter({ href, children, onClick }) {
  return (
    <li>
      <a
        onClick={onClick}
        className="block font-bold transition hover:translate-x-1 hover:text-red-600"
        href={href}
      >
        {children}
      </a>
    </li>
  );
}

export { CategoryFilters, CategoryFilter };
