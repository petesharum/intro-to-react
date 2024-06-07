import { formatMoney } from '@/lib/format-money';

function LineItems({ children }) {
  return (
    <ul className="grid grid-cols-[min-content_min-content_1fr_min-content] gap-x-4">
      {children}
    </ul>
  );
}

function LineItem({ name, price, quantity }) {
  return (
    <li className="col-span-full grid grid-cols-subgrid">
      <span className="text-right">{quantity}</span>
      <span>✕</span>
      <span className="font-bold">{name}</span>
      <span className="text-right">{formatMoney(price)}</span>
    </li>
  );
}

export { LineItems, LineItem };
