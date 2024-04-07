import { useState } from 'react';

import { StickyCard } from '@/components/shared/sticky-card';
import { Button } from '@/components/ui/button';
import { CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Title } from '@/components/ui/title';
import { formatMoney } from '@/lib/format-money';

function ProductDetailCard({ product, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddToCart({ product, quantity });
  };

  const handleQuantityChange = (event) => {
    setQuantity(+event.target.value);
  };

  return (
    <StickyCard>
      <form onSubmit={handleSubmit}>
        <CardHeader className="gap-8">
          <Title>{product.name}</Title>
          <p>{product.description}</p>
        </CardHeader>
        <CardContent>
          <Label htmlFor="quantity-field">Quantity</Label>
          <Input
            name="quantity"
            onChange={handleQuantityChange}
            id="quantity-field"
            type="number"
            step={1}
            min={1}
            value={quantity}
          />
        </CardContent>
        <CardFooter>
          <Button
            className="bg-red-600 py-4 text-base font-bold hover:bg-red-700"
            type="submit"
          >
            Add to Cart {formatMoney(quantity * product.price)}
          </Button>
        </CardFooter>
      </form>
    </StickyCard>
  );
}

export { ProductDetailCard };
