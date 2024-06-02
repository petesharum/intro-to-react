import { useState, useMemo, useRef, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { generateSummary } from '@/lib/api';

import { CartContext } from './cart-context';

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const previousSummary = useRef({
    subtotal: 0,
    tax: 0,
    total: 0,
  });
  const {
    data: summary,
    isPending,
    isPlaceholderData,
  } = useQuery({
    queryKey: ['summary', cartItems],
    queryFn: () => generateSummary(cartItems),
    placeholderData: previousSummary.current,
  });

  useEffect(() => {
    previousSummary.current = summary;
  }, [summary]);

  const cart = useMemo(
    () => ({
      items: cartItems,
      isPending: isPending || isPlaceholderData,
      ...summary,

      itemCount: cartItems.reduce((total, item) => total + item.quantity, 0),

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
    [cartItems, isPending, isPlaceholderData, summary],
  );

  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
}

export { CartProvider };
