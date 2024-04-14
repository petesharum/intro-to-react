import { CartItem, OrderPaymentSummary } from './types';

async function generateSummary(
  cartItems: CartItem[],
): Promise<OrderPaymentSummary | null> {
  if (cartItems.length === 0) {
    return null;
  }

  const items = cartItems.map(({ product, quantity }) => ({
    productId: product.productId,
    quantity,
  }));

  const response = await fetch('/api/order/summary', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(items),
  });

  return response.json();
}

export { generateSummary };
