import { useEffect } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { submitOrder } from '@/lib/api';
import { LineItems, LineItem } from '@/lib/checkout';
import { pluralize } from '@/lib/pluralize';
import {
  Field,
  FieldLabel,
  FieldInput,
  FieldDescription,
} from '@/lib/shared-components/field';
import { SummaryItem, Summary } from '@/lib/shared-components/summary';
import {
  StickyCard,
  StickyCardHeader,
  StickyCardContent,
  StickyCardFooter,
} from '@/lib/shared-components/sticky-card';
import { Button } from '@/lib/ui/button';
import { Separator } from '@/lib/ui/separator';
import { Title } from '@/lib/shared-components/title';
import { useCart } from '@/lib/cart-context';
import { formatMoney } from '@/lib/format-money';
import { Grid, GridColLeft, GridColRight } from '@/lib/shared-components/grid';

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
    <Grid>
      <GridColLeft>
        <Title>Checkout</Title>
        <form
          className="grid grid-cols-12 gap-x-4 gap-y-8"
          id="payment-info"
          onSubmit={handleSubmit}
        >
          <Field className="col-span-full">
            <FieldLabel htmlFor="fName">Name</FieldLabel>
            <FieldInput name="fName" id="fName" />
          </Field>
          <Field className="col-span-full">
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <FieldInput name="email" id="email" type="email" />
          </Field>
          <Field className="col-span-full">
            <FieldLabel htmlFor="cardNumber">Card Number</FieldLabel>
            <FieldInput name="cardNumber" id="cardNumber" maxLength="16" />
          </Field>
          <Field className="col-span-4">
            <FieldLabel htmlFor="expiry">Expiration Date</FieldLabel>
            <FieldInput name="expiry" id="expiry" maxLength="5" />
            <FieldDescription>(MM/YY)</FieldDescription>
          </Field>
          <Field className="col-span-4">
            <FieldLabel htmlFor="cvv">CVV</FieldLabel>
            <FieldInput name="cvv" id="cvv" maxLength="4" />
            <FieldDescription>(3 or 4 digits)</FieldDescription>
          </Field>
          <Field className="col-span-4">
            <FieldLabel htmlFor="postalCode">Postal Code</FieldLabel>
            <FieldInput name="postalCode" id="postalCode" />
          </Field>
        </form>
      </GridColLeft>
      <GridColRight>
        <StickyCard>
          <StickyCardHeader>
            <h2 className="text-xl font-black uppercase tracking-wide">
              {itemCount} {pluralize(itemCount, 'Item', 'Items')}
            </h2>
          </StickyCardHeader>
          <StickyCardContent>
            <LineItems>
              {items.map(({ product, quantity }) => (
                <LineItem
                  key={product.productId}
                  name={product.name}
                  price={product.price}
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
      </GridColRight>
    </Grid>
  );
}

export { Checkout };
