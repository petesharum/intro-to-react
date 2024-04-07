import { useEffect, useId, Fragment } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { StickyCard } from '@/components/shared/sticky-card';
import { CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Title } from '@/components/ui/title';
import { useCart } from '@/lib/use-cart';
import { formatMoney } from '@/lib/format-money';
import { cn } from '@/lib/utils';

function Field({ className, label, id: idProp, name, type = 'text' }) {
  const id = useId();
  const resolvedId = idProp || id;
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <Label htmlFor={resolvedId}>{label}</Label>
      <Input name={name} type={type} id={resolvedId} />
    </div>
  );
}

async function submitOrder(event, items) {
  event.preventDefault();
  const formData = new FormData(event.target);

  const response = await fetch('/api/order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      order: items,
      payment: Object.fromEntries(formData),
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to submit order');
  }
}

function Checkout() {
  const { items, subtotal, tax, total, itemCount, resetCart } = useCart();
  const navigate = useNavigate();
  const { mutate: handleSubmit, isPending } = useMutation({
    mutationFn: async (event) => submitOrder(event, items),
    onError: (error) => toast.error(error.message),
    onSuccess: () => {
      resetCart();
      navigate('/menu');
      toast.success('Order placed successfully');
    },
  });

  useEffect(() => {
    if (items.length === 0 && !isPending) {
      navigate('/cart');
    }
  }, [items, navigate, isPending]);

  return (
    <>
      <div className="col-span-6 col-start-2 flex flex-col gap-8">
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
            label="Expiration Date (MM/YY)"
            name="expiry"
          />
          <Field
            className="col-span-4"
            label="CVV (3 or 4 digits)"
            name="cvv"
          />
          <Field className="col-span-4" label="Postal Code" name="postalCode" />
        </form>
      </div>
      <div className="col-span-4 col-start-8">
        <StickyCard>
          <CardHeader className="gap-8">
            <h2 className="text-xl font-black uppercase tracking-wide">
              {itemCount} {itemCount === 1 ? 'Item' : 'Items'}
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
                <dt>Total:</dt>
                <dd className="ml-auto text-right">{formatMoney(total)}</dd>
              </div>
            </dl>
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
