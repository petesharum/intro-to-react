import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function handleSubmit(event) {
  event.preventDefault();
  console.log('submit');
}

function ItemDetail() {
  const [item, setItem] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetch(`/api/items/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setItem(data);
      });
  }, [id]);

  return (
    <>
      <div className="col-span-6 col-start-2">
        <h1>{item.name}</h1>
        <ul>
          <li>image</li>
          <li>options</li>
        </ul>
      </div>
      <div className="col-span-3">
        <p>{item.description}</p>
        <form onSubmit={handleSubmit}>
          <Label htmlFor="quantity-field">Quantity</Label>
          <Input
            name="quantity"
            id="quantity-field"
            type="number"
            min={1}
            defaultValue="1"
          />
          <Button type="submit">Add to Cart {item.price}</Button>
        </form>
      </div>
    </>
  );
}

export { ItemDetail };
