// TODO: style
// TODO: move into a dialog?
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Title } from '@/components/ui/title';
import { useCart } from '@/lib/cart/use-cart';
import { formatMoney } from '@/lib/format-money';

function Cart() {
  const {
    items,
    removeFromCart,
    setCartQuantity,
    subtotal,
    tax,
    total,
    itemCount,
  } = useCart();
  const navigate = useNavigate();

  function handleCheckout() {
    navigate('/checkout');
  }

  if (items.length === 0) {
    return (
      <div className="col-span-10 col-start-2 flex flex-col gap-8">
        <Title>Uh, your cart is empty!</Title>
        <Button onClick={() => navigate('/menu')}>Start order</Button>
      </div>
    );
  }

  return (
    <>
      <div className="col-span-6 col-start-2 flex flex-col gap-8">
        <Title>My Cart</Title>
        <ul className="flex flex-col gap-4">
          {items.map(({ product, quantity }) => (
            <li className="flex bg-slate-100" key={product.productId}>
              <img
                className="h-36 w-36 object-cover"
                src={`/images/${product.image.url}`}
                alt={product.image.alt}
              />
              <div className="flex flex-1 flex-col gap-2 p-4">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <div className="flex items-center">
                  <Input
                    value={quantity}
                    onChange={(event) => {
                      setCartQuantity(product.productId, +event.target.value);
                    }}
                    min={1}
                    step={1}
                    type="number"
                  />
                  {' ✕ '}
                  <span>{formatMoney(product.price)}</span>
                </div>
                <Button
                  variant="link"
                  onClick={() => removeFromCart(product.productId)}
                >
                  Remove
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="col-span-4 col-start-8">
        <Card className="sticky top-32 shadow-xl">
          <CardHeader className="gap-8">
            <h2 className="text-xl font-black uppercase tracking-wide">
              {itemCount} {itemCount === 1 ? 'Item' : 'Items'}
            </h2>
          </CardHeader>
          <CardContent>
            <p>Subtotal: {formatMoney(subtotal)}</p>
            <p>Tax: {formatMoney(tax)}</p>
            <p>Estimated Total: {formatMoney(total)}</p>
          </CardContent>
          <CardFooter>
            <Button onClick={handleCheckout}>
              Checkout {formatMoney(total)}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export { Cart };
