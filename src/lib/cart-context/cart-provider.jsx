import { useState, useMemo, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { generateLineItems } from '@/lib/api';

import { CartContext } from './cart-context';

function getLineItemsQuery(cartItems, placeholderData) {
  return {
    queryKey: ['line-items', cartItems],
    queryFn: () => generateLineItems(cartItems),
    placeholderData,
  };
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
  } = useQuery(getLineItemsQuery(cartItems, previousLineItems.current));

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
