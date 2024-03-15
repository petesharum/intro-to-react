import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCart } from '@/data/cart/use-cart';

function Checkout() {
  const { items } = useCart();
  const priceTotal = items.reduce(
    (total, { product, quantity }) => total + product.price * quantity,
    0,
  );
  const quantityTotal = items.reduce((total, item) => total + item.quantity, 0);

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
            {quantityTotal} {quantityTotal === 1 ? 'Item' : 'Items'}
          </h2>
          <ul>
            {items.map(({ product, quantity }) => (
              <li key={product.productId}>
                {product.name} ✕ {quantity} {product.price}
              </li>
            ))}
          </ul>
          <p>Total: {priceTotal}</p>
          <Button>Place Order {priceTotal}</Button>
        </div>
      </form>
    </div>
  );
}

export { Checkout };
