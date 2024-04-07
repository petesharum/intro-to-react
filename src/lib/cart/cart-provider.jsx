import { useState, useMemo, useRef, useEffect } from 'react';

import { CartContext } from './cart-context';
import { useQuery } from '@tanstack/react-query';

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
  const previousLineItems = useRef({
    subtotal: 0,
    tax: 0,
    total: 0,
  });
  const {
    data: lineItems,
    isPending,
    isPlaceholderData,
  } = useQuery({
    queryKey: ['line-items', cartItems],
    queryFn: () => generateLineItems(cartItems),
    placeholderData: previousLineItems.current,
  });

  useEffect(() => {
    previousLineItems.current = lineItems;
  }, [lineItems]);

  const itemCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems],
  );

  const cart = useMemo(
    () => ({
      items: cartItems,
      isPending: isPending || isPlaceholderData,
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
    [cartItems, isPending, isPlaceholderData, lineItems, itemCount],
  );

  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
}

export { CartProvider };
