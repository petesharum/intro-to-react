import { useEffect } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { submitOrder } from '@/lib/api';
import { LineItems, LineItem } from '@/lib/checkout';
import { pluralize } from '@/lib/pluralize';
import { Field } from '@/lib/shared-components/field';
import { SummaryItem, Summary } from '@/lib/shared-components/summary';
import {
  StickyCard,
  StickyCardHeader,
  StickyCardContent,
  StickyCardFooter,
} from '@/lib/shared-components/sticky-card';
import { Button } from '@/lib/ui/button';
import { Separator } from '@/lib/ui/separator';
import { Title } from '@/lib/ui/title';
import { useCart } from '@/lib/cart-context';
import { formatMoney } from '@/lib/format-money';

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
          <StickyCardHeader className="gap-8">
            <h2 className="text-xl font-black uppercase tracking-wide">
              {itemCount} {pluralize(itemCount, 'Item', 'Items')}
            </h2>
          </StickyCardHeader>
          <StickyCardContent>
            <LineItems>
              {items.map(({ product, quantity }) => (
                <LineItem
                  key={product.productId}
                  product={product}
                  quantity={quantity}
                />
              ))}
            </LineItems>
            <Separator className="my-4" />
            <Summary>
              <SummaryItem label="Subtotal" detail={formatMoney(subtotal)} />
              <SummaryItem label="Tax" detail={formatMoney(tax)} />
              <SummaryItem
                label="Total"
                detail={formatMoney(total)}
                className="font-bold"
              />
            </Summary>
          </StickyCardContent>
          <StickyCardFooter>
            <Button form="payment-info" type="submit" isPending={isPending}>
              Place Order {formatMoney(total)}
            </Button>
          </StickyCardFooter>
        </StickyCard>
      </div>
    </>
  );
}

export { Checkout };
