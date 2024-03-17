// TODO: style
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/cart/use-cart';
import { formatMoney } from '@/lib/format-money';

function Checkout() {
  const { items, totalPrice, itemCount } = useCart();

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    fetch('/api/order', {
      method: 'POST',
      body: JSON.stringify({
        items,
        customerInfo: Object.fromEntries(formData),
      }),
    });
  }

  return (
    <div>
      <h1>Checkout</h1>
      <form onSubmit={handleSubmit}>
        <Label htmlFor="name-field">Name</Label>
        <Input type="text" id="name-field" />
        <Label htmlFor="email-field">Email</Label>
        <Input type="email" id="email-field" />
        <Label htmlFor="address-field">Address</Label>
        <Input type="text" id="address-field" />
        <Label htmlFor="city-field">City</Label>
        <Input type="text" id="city-field" />
        <Label htmlFor="state-field">State</Label>
        <Input type="text" id="state-field" />
        <Label htmlFor="zip-field">Zip</Label>
        <Input type="text" id="zip-field" />
        <Label htmlFor="card-field">Card</Label>
        <Input type="text" id="card-field" />
        <Label htmlFor="expiry-field">Expiry</Label>
        <Input type="text" id="expiry-field" />
        <Label htmlFor="cvv-field">CVV</Label>
        <Input type="text" id="cvv-field" />
        <div>
          <h2>
            {itemCount} {itemCount === 1 ? 'Item' : 'Items'}
          </h2>
          <ul>
            {items.map(({ product, quantity }) => (
              <li key={product.productId}>
                {product.name} ✕ {quantity} {formatMoney(product.price)}
              </li>
            ))}
          </ul>
          <p>Total: {formatMoney(totalPrice)}</p>
          <Button>Place Order {formatMoney(totalPrice)}</Button>
        </div>
      </form>
    </div>
  );
}

export { Checkout };
