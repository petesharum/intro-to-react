import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/data/cart/use-cart';

function ProductDetail() {
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    addToCart({ product: product, quantity });
    navigate('/menu');
  }

  const handleQuantityChange = (event) => {
    setQuantity(+event.target.value);
  };
  useEffect(() => {
    fetch(`/api/items/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      });
  }, [id]);

  return (
    <>
      <div className="col-span-6 col-start-2">
        <ol className="flex gap-2">
          <li className="flex gap-2">
            <Link to=".." relative="path">
              Menu
            </Link>
          </li>
          <li className="flex gap-2">
            <span>&gt;</span>
            <Link to="#" aria-current="page">
              {product.name}
            </Link>
          </li>
        </ol>
        <ul>
          <li>image</li>
          <li>options</li>
        </ul>
      </div>
      <div className="col-span-3">
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <form onSubmit={handleSubmit}>
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
          <Button type="submit">Add to Cart {product.price}</Button>
        </form>
      </div>
    </>
  );
}

export { ProductDetail };
