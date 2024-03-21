import { useState, useMemo, useEffect } from 'react';

import { CartContext } from './cart-context';

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [lineItems, setLineItems] = useState({});

  const itemCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems],
  );

  useEffect(() => {
    if (cartItems.length === 0) {
      setLineItems({});
      return;
    }

    const items = cartItems.map(({ product, quantity }) => ({
      productId: product.productId,
      quantity,
    }));
    fetch('/api/order/line-items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(items),
    })
      .then((res) => res.json())
      .then((data) => {
        setLineItems(data);
      });
  }, [cartItems]);

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

      resetCart: () => {
        setCartItems([]);
      },
    }),
    [cartItems, lineItems, itemCount],
  );

  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
}

export { CartProvider };
