import { useState } from 'react';

import {
  StickyCard,
  StickyCardHeader,
  StickyCardContent,
  StickyCardFooter,
} from '@/lib/shared-components/sticky-card';
import { Button } from '@/lib/ui/button';
import { Title } from '@/lib/shared-components/title';
import { formatMoney } from '@/lib/format-money';
import { Field, FieldLabel, FieldInput } from '../shared-components/field';

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
      <StickyCardHeader>
        <Title>{product.name}</Title>
        <p>{product.description}</p>
      </StickyCardHeader>
      <StickyCardContent>
        <form id="add-to-cart" onSubmit={handleSubmit}>
          <Field>
            <FieldLabel htmlFor="quantity">Quantity</FieldLabel>
            <FieldInput
              name="quantity"
              id="quantity"
              type="number"
              step="1"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
            />
          </Field>
        </form>
      </StickyCardContent>
      <StickyCardFooter>
        <Button
          className="bg-red-600 py-4 text-base font-bold hover:bg-red-700"
          type="submit"
          form="add-to-cart"
        >
          Add to Cart {formatMoney(quantity * product.price)}
        </Button>
      </StickyCardFooter>
    </StickyCard>
  );
}

export { ProductDetailCard };
