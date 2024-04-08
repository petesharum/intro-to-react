import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Title } from '@/components/ui/title';
import { useCart, EmptyCart } from '@/lib/cart';
import { formatMoney } from '@/lib/format-money';
import { cn } from '@/lib/utils';
import { StickyCard } from '@/components/shared/sticky-card';

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
      <div className="col-span-6 col-start-2 flex flex-col gap-8">
        <Title>My Cart</Title>
        <ul className="flex flex-col gap-4">
          {items.map(({ product, quantity }) => (
            <Card
              asChild
              className="flex gap-4 bg-secondary p-4 shadow-xl"
              key={product.productId}
            >
              <li className="relative">
                <img
                  className="h-28 w-28 object-cover"
                  src={`/images/${product.image.url}`}
                  alt={product.image.alt}
                />
                <div className="flex flex-1 flex-col gap-2 p-4">
                  <h2 className="text-lg font-bold">{product.name}</h2>
                  <div className="flex items-center gap-2">
                    <Input
                      className="w-20"
                      value={quantity}
                      onChange={(event) => {
                        setCartQuantity(product.productId, +event.target.value);
                      }}
                      min={1}
                      max={50}
                      step={1}
                      type="number"
                    />
                    {' ✕ '}
                    <span>{formatMoney(product.price)}</span>
                  </div>
                </div>
                <Button
                  className="absolute right-0 top-0 p-4 text-primary/30 hover:text-primary/100"
                  variant="ghost"
                  onClick={() => removeFromCart(product.productId)}
                >
                  <X />
                  <span className="sr-only">Remove</span>
                </Button>
              </li>
            </Card>
          ))}
        </ul>
      </div>
      <div className="col-span-4 col-start-8">
        <StickyCard>
          <CardHeader className="gap-8">
            <h2 className="text-xl font-black uppercase tracking-wide">
              {itemCount} {itemCount === 1 ? 'Item' : 'Items'}
            </h2>
          </CardHeader>
          <CardContent className={cn({ 'opacity-50': isPending })}>
            <dl>
              <div className="flex gap-4">
                <dt>Subtotal:</dt>
                <dd className="ml-auto text-right">{formatMoney(subtotal)}</dd>
              </div>
              <div className="flex gap-4">
                <dt>Tax:</dt>
                <dd className="ml-auto text-right">{formatMoney(tax)}</dd>
              </div>
              <div className="flex gap-4 font-bold">
                <dt>Estimated Total:</dt>
                <dd className="ml-auto text-right">{formatMoney(total)}</dd>
              </div>
            </dl>
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
