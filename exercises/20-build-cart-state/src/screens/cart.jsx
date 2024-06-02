import { useState } from 'react';

import { EmptyCart, CartItems, CartItem } from '@/lib/cart';
import { formatMoney } from '@/lib/format-money';
import { pluralize } from '@/lib/pluralize';
import { SummaryItem, Summary } from '@/lib/shared-components/summary';
import {
  StickyCard,
  StickyCardHeader,
  StickyCardHeading,
  StickyCardContent,
} from '@/lib/shared-components/sticky-card';
import { Title } from '@/lib/shared-components/title';
import { Grid, GridColLeft, GridColRight } from '@/lib/shared-components/grid';
import { useFetch, Status } from '@/lib/use-fetch';

function Cart() {
  const [items, setItems] = useState([]);
  const { data: summary = { subtotal: 0, tax: 0, total: 0 }, status } =
    useFetch(`${window.location.origin}/api/order/summary`, {
      initialData: { subtotal: 0, tax: 0, total: 0 },
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(items),
    });
  const { subtotal, tax, total } = summary;
  const isPending = status === Status.PENDING;

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  // eslint-disable-next-line no-unused-vars -- you're gonna need this
  const addToCart = (item) => {
    setItems((prevItems) => {
      const prevItem = prevItems.find(
        ({ product }) => product.productId === item.product.productId,
      );

      if (prevItem) {
        return prevItems.map((prevItem) =>
          prevItem.product.productId === item.product.productId
            ? {
                ...prevItem,
                quantity: prevItem.quantity + item.quantity,
              }
            : prevItem,
        );
      }

      return [...prevItems, item];
    });
  };

  const removeFromCart = (productId) => {
    setItems((prevItems) =>
      prevItems.filter(({ product }) => product.productId !== productId),
    );
  };

  const setCartQuantity = (productId, quantity) => {
    setItems((prevItems) =>
      prevItems.map((prevItem) =>
        prevItem.product.productId === productId
          ? { ...prevItem, quantity }
          : prevItem,
      ),
    );
  };

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <Grid>
      <GridColLeft>
        <Title>My Cart</Title>
        <CartItems>
          {items.map(({ product, quantity }) => (
            <CartItem
              key={product.productId}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={quantity}
              onQuantityChange={(event) => {
                setCartQuantity(product.productId, +event.target.value);
              }}
              onRemove={() => removeFromCart(product.productId)}
            />
          ))}
        </CartItems>
      </GridColLeft>
      <GridColRight>
        <StickyCard>
          <StickyCardHeader>
            <StickyCardHeading>
              {itemCount} {pluralize(itemCount, 'Item', 'Items')}
            </StickyCardHeading>
          </StickyCardHeader>
          <StickyCardContent>
            <Summary isPending={isPending}>
              <SummaryItem label="Subtotal" detail={formatMoney(subtotal)} />
              <SummaryItem label="Tax" detail={formatMoney(tax)} />
              <SummaryItem
                label="Estimated Total"
                detail={formatMoney(total)}
                className="font-bold"
              />
            </Summary>
          </StickyCardContent>
        </StickyCard>
      </GridColRight>
    </Grid>
  );
}

export { Cart };
