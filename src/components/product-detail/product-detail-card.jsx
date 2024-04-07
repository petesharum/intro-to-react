import { useState } from 'react';

import { StickyCard } from '@/components/shared/sticky-card';
import { Button } from '@/components/ui/button';
import { CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Title } from '@/components/ui/title';
import { formatMoney } from '@/lib/format-money';
import { Field } from '../shared/field';

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
          <Field
            label="Quantity"
            name="quantity"
            type="number"
            slotProps={{
              input: {
                step: 1,
                min: 1,
                value: quantity,
                onChange: handleQuantityChange,
              },
            }}
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
