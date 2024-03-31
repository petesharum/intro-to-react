import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import { Skeleton } from '@/components/ui/skeleton';
import { formatMoney } from '@/lib/format-money';

async function fetchMenuItems(searchParams) {
  const url = new URL('/api/menu', window.location.origin);

  for (let entry of searchParams.entries()) {
    url.searchParams.append(...entry);
  }

  const response = await fetch(url);

  return response.json();
}

function MenuItemSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="aspect-square w-full rounded" />
      <div className="flex flex-col gap-2">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-20" />
      </div>
    </div>
  );
}

function MenuItems() {
  const [searchParams] = useSearchParams();
  const { data: items } = useQuery({
    queryKey: ['menu', searchParams.toString()],
    queryFn: () => {
      return fetchMenuItems(searchParams);
    },
  });

  if (!items)
    return (
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <MenuItemSkeleton key={i} />
        ))}
      </div>
    );

  return items?.length === 0 ? (
    <div>No results</div>
  ) : (
    <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
      {items?.map((item) => (
        <Link
          className="flex flex-col gap-2 [&:hover_img]:scale-110"
          to={item.productId}
          key={item.productId}
        >
          <div className="overflow-hidden rounded">
            <img
              className="transition-transform ease-out"
              height="300"
              width="300"
              src={`/images/${item.image.url}`}
              alt={item.image.alt}
            />
          </div>
          <div>
            <div className="text-lg font-bold">{item.name}</div>
            <div>{formatMoney(item.price)}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export { MenuItems };
