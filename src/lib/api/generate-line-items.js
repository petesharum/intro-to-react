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

export { generateLineItems };
