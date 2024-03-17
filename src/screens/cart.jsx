// TODO: style
// TODO: move into a dialog?
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Title } from '@/components/ui/title';
import { useCart } from '@/lib/cart/use-cart';
import { formatMoney } from '@/lib/format-money';

function Cart() {
  const { items, removeFromCart, setCartQuantity, totalPrice, itemCount } =
    useCart();
  const navigate = useNavigate();

  function handleCheckout() {
    navigate('/checkout');
  }

  if (items.length === 0) {
    return (
      <div>
        <div>Uh, your cart is empty!</div>
        <Button onClick={() => navigate('/menu')}>Start order</Button>
      </div>
    );
  }

  return (
    <div>
      <Title>My Cart</Title>
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
            <span>{formatMoney(product.price)}</span>
            <Button
              variant="link"
              onClick={() => removeFromCart(product.productId)}
            >
              Remove
            </Button>
          </li>
        ))}
      </ul>
      <div>
        <h2>
          {itemCount} {itemCount === 1 ? 'Item' : 'Items'}
        </h2>
        <p>Total: {formatMoney(totalPrice)}</p>
        <Button onClick={handleCheckout}>
          Checkout {formatMoney(totalPrice)}
        </Button>
      </div>
    </div>
  );
}

export { Cart };
