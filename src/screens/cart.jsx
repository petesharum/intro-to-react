import { Link } from 'react-router-dom';
import { X, Loader2 } from 'lucide-react';

import { Button, buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Title } from '@/components/ui/title';
import { useCart } from '@/lib/cart';
import { formatMoney } from '@/lib/format-money';
import { cn } from '@/lib/utils';
import { StickyCard } from '@/components/shared/sticky-card';

function EmptyCart() {
  return (
    <div className="relative col-span-full">
      <img
        className="w-1/2 max-w-[950px] md:translate-x-[10%]"
        src="/images/empty-bag.png"
        alt="An empty paper bag."
      />
      <div className="left-1/2 top-1/2 flex flex-col gap-4 md:absolute md:w-1/2 md:translate-y-[-50%]">
        <Title>Move along, folks. Nothing&nbsp;here to&nbsp;see</Title>
        <div className="flex flex-col items-start gap-8">
          <p>
            Psst...if you&apos;re really that hungry, try adding something to
            your cart.
          </p>
          <Link className={buttonVariants()} to="/menu">
            Start a new order
          </Link>
        </div>
      </div>
    </div>
  );
}

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
            <Link
              className={cn(buttonVariants(), {
                'opacity-50': isPending,
              })}
              to="/checkout"
            >
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}{' '}
              Checkout {formatMoney(total)}
            </Link>
          </CardFooter>
        </StickyCard>
      </div>
    </>
  );
}

export { Cart };
