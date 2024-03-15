import { useState, useMemo } from 'react';

import { CartContext } from './cart-context';

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const cart = useMemo(
    () => ({
      items: cartItems,

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
        console.log('Item added to cart:', item);
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
    }),
    [cartItems],
  );

  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
}

export { CartProvider };
