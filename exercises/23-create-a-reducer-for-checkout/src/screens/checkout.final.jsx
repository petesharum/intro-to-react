import { useEffect, useCallback, useReducer } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

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
  StickyCardHeading,
  StickyCardContent,
  StickyCardFooter,
} from '@/lib/shared-components/sticky-card';
import { Button } from '@/lib/ui/button';
import { Separator } from '@/lib/ui/separator';
import { Title } from '@/lib/shared-components/title';
import { useCart } from '@/lib/cart-context';
import { formatMoney } from '@/lib/format-money';
import { Grid, GridColLeft, GridColRight } from '@/lib/shared-components/grid';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const ActionType = {
  MUTATE: 'mutate',
  RESOLVE: 'resolve',
  REJECT: 'reject',
};

function useMutationReducer(state, action) {
  switch (action.type) {
    case ActionType.MUTATE:
      return { ...state, status: Status.PENDING };
    case ActionType.RESOLVE:
      return { ...state, status: Status.RESOLVED, data: action.payload };
    case ActionType.REJECT:
      return { ...state, status: Status.REJECTED, error: action.payload };
    default:
      return state;
  }
}

function useMutation({ mutationFn, onSuccess, onError }) {
  const [state, dispatch] = useReducer(useMutationReducer, {
    status: Status.IDLE,
    data: undefined,
    error: '',
  });

  const mutate = useCallback(async () => {
    const promise = mutationFn();

    if (!promise || typeof promise.then !== 'function') {
      throw new Error(
        "The mutationFn must return a promise. Maybe you're passing a function that isn't returning anything?",
      );
    }

    dispatch({ type: ActionType.MUTATE });

    try {
      const data = await promise;

      dispatch({ type: ActionType.RESOLVE, payload: data });
      onSuccess?.(data);
    } catch (error) {
      let { message } = error || {};

      if (!message) {
        message = 'Faild to place order';
      }

      dispatch({ type: ActionType.REJECT, payload: message });
      onError?.(error);
    }
  }, [mutationFn, onError, onSuccess]);

  return {
    mutate,
    ...state,
    // convenience helpers
    isIdle: state.status === Status.IDLE,
    isPending: state.status === Status.PENDING,
    isResolved: state.status === Status.RESOLVED,
    isRejected: state.status === Status.REJECTED,
  };
}

async function postOrder(payment, items) {
  const res = await fetch('/api/order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ payment, items }),
  });

  if (!res.ok) {
    throw new Error('Failed to place order');
  }

  return res.text();
}

function Checkout() {
  const { items, subtotal, tax, total, itemCount, resetCart } = useCart();
  const navigate = useNavigate();
  const { mutate, isPending, isIdle } = useMutation({
    mutationFn: postOrder,
    onSuccess: () => {
      resetCart();
      navigate('/menu');
      toast.success('Order placed successfully');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const payment = Object.fromEntries(formData);

    mutate(payment, items);
  };

  useEffect(() => {
    if (items.length === 0 && isIdle) {
      navigate('/cart', { replace: true });
    }
  }, [items, navigate, isIdle]);

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
            <StickyCardHeading>
              {itemCount} {pluralize(itemCount, 'Item', 'Items')}
            </StickyCardHeading>
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
