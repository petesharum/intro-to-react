import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Title } from '@/components/ui/title';
import { useCart } from '@/lib/cart/use-cart';
import { formatMoney } from '@/lib/format-money';

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
      <Breadcrumb className="col-span-10 col-start-2">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to=".." relative="path">
                Menu
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-bold">
              {product.name}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="col-span-6 col-start-2">
        <div className="flex flex-col gap-4">
          <img src={`/images/${product.image?.url}`} alt={product.image?.alt} />
        </div>
      </div>
      <div className="col-span-4 col-start-8">
        <Card className="sticky top-32 shadow-xl">
          <CardHeader className="gap-8">
            <Title>{product.name}</Title>
            <p>{product.description}</p>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
              <div className="flex items-center gap-4">
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
              </div>
              <Button
                className="bg-red-600 py-4 text-base font-bold hover:bg-red-700"
                type="submit"
              >
                Add to Cart {formatMoney(quantity * product.price)}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export { ProductDetail };
