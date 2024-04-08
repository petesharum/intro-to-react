import { useEffect, Fragment } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { pluralize } from '@/lib/pluralize';
import { Field } from '@/lib/shared-components/field';
import { LineItem, LineItems } from '@/lib/shared-components/line-items';
import { StickyCard } from '@/lib/shared-components/sticky-card';
import { CardContent, CardFooter, CardHeader } from '@/lib/ui/card';
import { Button } from '@/lib/ui/button';
import { Separator } from '@/lib/ui/separator';
import { Title } from '@/lib/ui/title';
import { useCart } from '@/lib/cart-context';
import { formatMoney } from '@/lib/format-money';

async function submitOrder(order) {
  const response = await fetch('/api/order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  });

  if (!response.ok) {
    throw new Error('Failed to submit order');
  }
}

function Checkout() {
  const { items, subtotal, tax, total, itemCount, resetCart } = useCart();
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: submitOrder,
    onError: (error) => toast.error(error.message),
    onSuccess: () => {
      resetCart();
      navigate('/menu');
      toast.success('Order placed successfully');
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const payment = Object.fromEntries(formData);

    mutate({ payment, items });
  };

  useEffect(() => {
    if (items.length === 0 && !isPending) {
      navigate('/cart');
    }
  }, [items, navigate, isPending]);

  return (
    <>
      <div className="col-span-7 flex flex-col gap-4 lg:col-span-6 lg:col-start-2 lg:gap-8">
        <Title>Checkout</Title>
        <form
          className="grid grid-cols-12 gap-x-4 gap-y-8"
          id="payment-info"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <Field className="col-span-full" label="Name" name="fName" />
          <Field
            className="col-span-full"
            label="Email"
            name="email"
            type="email"
          />
          <Field
            className="col-span-full"
            label="Card Number"
            name="cardNumber"
          />
          <Field
            className="col-span-4"
            label="Expiration Date"
            description="(MM/YY)"
            name="expiry"
          />
          <Field
            className="col-span-4"
            label="CVV"
            description="(3 or 4 digits)"
            name="cvv"
          />
          <Field className="col-span-4" label="Postal Code" name="postalCode" />
        </form>
      </div>
      <div className="col-span-5 lg:col-span-4 lg:col-start-8">
        <StickyCard>
          <CardHeader className="gap-8">
            <h2 className="text-xl font-black uppercase tracking-wide">
              {itemCount} {pluralize(itemCount, 'Item', 'Items')}
            </h2>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-[min-content_min-content_1fr_min-content] gap-x-4">
              {items.map(({ product, quantity }) => (
                <Fragment key={product.productId}>
                  <span className="text-right">{quantity}</span>
                  <span>✕</span>
                  <span className="font-bold">{product.name}</span>
                  <span className="text-right">
                    {formatMoney(product.price)}
                  </span>
                </Fragment>
              ))}
            </div>
            <Separator className="my-4" />
            <LineItems>
              <LineItem label="Subtotal" detail={formatMoney(subtotal)} />
              <LineItem label="Tax" detail={formatMoney(tax)} />
              <LineItem
                label="Total"
                detail={formatMoney(total)}
                className="font-bold"
              />
            </LineItems>
          </CardContent>
          <CardFooter>
            <Button form="payment-info" type="submit" isPending={isPending}>
              Place Order {formatMoney(total)}
            </Button>
          </CardFooter>
        </StickyCard>
      </div>
    </>
  );
}

export { Checkout };
