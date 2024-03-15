import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/data/cart/use-cart';

function Cart() {
  const { items, removeFromCart, setCartQuantity } = useCart();
  const navigate = useNavigate();
  const priceTotal = items.reduce(
    (total, { product, quantity }) => total + product.price * quantity,
    0,
  );
  const quantityTotal = items.reduce((total, item) => total + item.quantity, 0);

  function handleCheckout() {
    navigate('/checkout');
  }

  return (
    <div>
      <h1>My Cart</h1>
      <ul>
        {items.map(({ product, quantity }) => (
          <li key={product.productId}>
            {product.name}{' '}
            <Input
              defaultValue={quantity}
              onChange={(event) => {
                setCartQuantity(product.productId, +event.target.value);
              }}
              min={1}
              step={1}
              type="number"
            />
            {' ✕ '}
            <span>{product.price}</span>
            <Button onClick={() => removeFromCart(product.productId)}>
              Remove
            </Button>
          </li>
        ))}
      </ul>
      <div>
        <h2>
          {quantityTotal} {quantityTotal === 1 ? 'Item' : 'Items'}
        </h2>
        <p>Total: {priceTotal}</p>
        <Button onClick={handleCheckout}>Checkout {priceTotal}</Button>
      </div>
    </div>
  );
}

export { Cart };
