// TODO: style
import { useEffect } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Title } from '@/components/ui/title';
import { useCart } from '@/lib/use-cart';
import { formatMoney } from '@/lib/format-money';
import { useId } from 'react';

function Field({ label, id: idProp, name, type = 'text' }) {
  const id = useId();
  const resolvedId = idProp || id;
  return (
    <div>
      <Label htmlFor={resolvedId}>{label}</Label>
      <Input name={name} type={type} id={resolvedId} />
    </div>
  );
}

async function submitOrder(event, items) {
  event.preventDefault();
  const formData = new FormData(event.target);

  // mutation
  return fetch('/api/order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      order: items,
      payment: Object.fromEntries(formData),
    }),
  });
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
          className="flex flex-col gap-4"
          id="payment-info"
          onSubmit={handleSubmit}
        >
          <Field label="Name" name="fName" />
          <Field label="Email" name="email" type="email" />
          <Field label="Card Number" name="cardNumber" />
          <Field label="Expiration Date (MM/YY)" name="expiry" />
          <Field label="CVV (3 or 4 digits)" name="cvv" />
          <Field label="Postal Code" name="postalCode" />
        </form>
      </div>
      <div className="col-span-4 col-start-8">
        <Card className="sticky top-32 shadow-xl">
          <CardHeader className="gap-8">
            <h2 className="text-xl font-black uppercase tracking-wide">
              {itemCount} {itemCount === 1 ? 'Item' : 'Items'}
            </h2>
          </CardHeader>
          <CardContent>
            <p>Subtotal: {formatMoney(subtotal)}</p>
            <p>Tax: {formatMoney(tax)}</p>
            <p>Total: {formatMoney(total)}</p>
          </CardContent>
          <CardFooter>
            <Button form="payment-info" type="submit">
              Place Order {formatMoney(total)}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export { Checkout };
