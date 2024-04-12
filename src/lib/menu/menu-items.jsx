import { Link } from 'react-router-dom';

import { formatMoney } from '@/lib/format-money';
import { MenuItemSkeleton } from './menu-item-skeleton';

function MenuItems({ children, isPending }) {
  if (isPending) {
    return Array.from({ length: 8 }).map((_, i) => (
      <MenuItemSkeleton key={i} />
    ));
  }

  return (
    <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
      {children}
    </div>
  );
}

function MenuItemsNoResults() {
  return (
    <div className="grid-cols-12">
      <p>No menu items found.</p>
    </div>
  );
}

function MenuItem({ productId, image, name, price }) {
  return (
    <Link
      className="flex flex-col gap-2 [&:hover_img]:scale-110"
      to={productId}
    >
      <div className="overflow-hidden rounded">
        <img
          className="transition-transform ease-out"
          height="300"
          width="300"
          src={`/images/${image.url}`}
          alt={image.alt}
        />
      </div>
      <div>
        <div className="text-lg font-bold">{name}</div>
        <div>{formatMoney(price)}</div>
      </div>
    </Link>
  );
}

export { MenuItem, MenuItems, MenuItemsNoResults };
