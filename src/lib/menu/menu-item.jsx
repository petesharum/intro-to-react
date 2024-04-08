import { Link } from 'react-router-dom';

import { formatMoney } from '@/lib/format-money';

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

export { MenuItem };
