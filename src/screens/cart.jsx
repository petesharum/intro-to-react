import { Link } from 'react-router-dom';

import { EmptyCart, CartItem } from '@/lib/cart';
import { useCart } from '@/lib/cart-context';
import { formatMoney } from '@/lib/format-money';
import { pluralize } from '@/lib/pluralize';
import { LineItem, LineItems } from '@/lib/shared-components/line-items';
import { StickyCard } from '@/lib/shared-components/sticky-card';
import { Button } from '@/lib/ui/button';
import { CardContent, CardFooter, CardHeader } from '@/lib/ui/card';
import { Title } from '@/lib/ui/title';

function Cart() {
  const {
    items,
    removeFromCart,
    setCartQuantity,
    subtotal,
    tax,
    total,
    itemCount,
    isPending,
  } = useCart();

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <>
      <div className="col-span-7 flex flex-col gap-4 lg:col-span-6 lg:col-start-2 lg:gap-8">
        <Title>My Cart</Title>
        <ul className="flex flex-col gap-4">
          {items.map(({ product, quantity }) => (
            <li key={product.productId}>
              <CartItem
                {...product}
                quantity={quantity}
                onQuantityChange={(event) => {
                  setCartQuantity(product.productId, +event.target.value);
                }}
                onRemove={() => removeFromCart(product.productId)}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="col-span-5 lg:col-span-4 lg:col-start-8">
        <StickyCard>
          <CardHeader className="gap-8">
            <h2 className="text-xl font-black uppercase tracking-wide">
              {itemCount} {pluralize(itemCount, 'Item', 'Items')}
            </h2>
          </CardHeader>
          <CardContent>
            <LineItems isPending={isPending}>
              <LineItem label="Subtotal" detail={formatMoney(subtotal)} />
              <LineItem label="Tax" detail={formatMoney(tax)} />
              <LineItem
                label="Estimated Total"
                detail={formatMoney(total)}
                className="font-bold"
              />
            </LineItems>
          </CardContent>
          <CardFooter>
            <Button asChild isPending={isPending}>
              <Link to="/checkout">Checkout {formatMoney(total)}</Link>
            </Button>
          </CardFooter>
        </StickyCard>
      </div>
    </>
  );
}

export { Cart };
