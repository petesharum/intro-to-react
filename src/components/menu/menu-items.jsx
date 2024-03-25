import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import { formatMoney } from '@/lib/format-money';

async function fetchMenuItems(searchParams) {
  const url = new URL('/api/menu', window.location.origin);

  for (let entry of searchParams.entries()) {
    url.searchParams.append(...entry);
  }

  const response = await fetch(url);

  return response.json();
}

function MenuItems() {
  const [searchParams] = useSearchParams();
  const { data: items } = useQuery({
    queryKey: ['menu', searchParams.toString()],
    queryFn: () => {
      return fetchMenuItems(searchParams);
    },
  });

  return items?.length === 0 ? (
    <div>No results</div>
  ) : (
    <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
      {items?.map((item) => (
        <Link
          className="flex flex-col gap-2 [&:hover_img]:scale-110"
          to={item.productId}
          key={item.productId}
        >
          <div className="overflow-hidden">
            <img
              className="transition-transform"
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
