import { useState, useMemo, useEffect } from 'react';

import { CartContext } from './cart-context';
import { useMutation } from '@tanstack/react-query';

async function generateLineItems(cartItems) {
  if (cartItems.length === 0) {
    return {};
  }

  const items = cartItems.map(({ product, quantity }) => ({
    productId: product.productId,
    quantity,
  }));

  const response = await fetch('/api/order/line-items', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(items),
  });

  return response.json();
}

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const { data: lineItems, mutate: fetchLineItems } = useMutation({
    mutationFn: generateLineItems,
  });

  const itemCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems],
  );

  useEffect(() => {
    fetchLineItems(cartItems);
  }, [fetchLineItems, cartItems]);

  const cart = useMemo(
    () => ({
      items: cartItems,
      ...lineItems,
      itemCount,

      addToCart: (item) => {
        setCartItems((prevItems) => {
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
      },

      removeFromCart: (productId) => {
        setCartItems((prevItems) =>
          prevItems.filter(({ product }) => product.productId !== productId),
        );
      },

      setCartQuantity: (productId, quantity) => {
        setCartItems((prevItems) =>
          prevItems.map((prevItem) =>
            prevItem.product.productId === productId
              ? { ...prevItem, quantity }
              : prevItem,
          ),
        );
      },

      resetCart: () => {
        setCartItems([]);
      },
    }),
    [cartItems, lineItems, itemCount],
  );

  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
}

export { CartProvider };
