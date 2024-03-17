import { useState, useMemo } from 'react';

import { CartContext } from './cart-context';

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const totalPrice = useMemo(
    () =>
      cartItems.reduce(
        (total, { product, quantity }) => total + product.price * quantity,
        0,
      ),
    [cartItems],
  );
  const itemCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems],
  );

  const cart = useMemo(
    () => ({
      items: cartItems,
      totalPrice,
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
    [cartItems, totalPrice, itemCount],
  );

  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
}

export { CartProvider };
