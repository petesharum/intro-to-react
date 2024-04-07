import { useParams, Link, useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { ProductCardSkeleton } from '@/components/product-detail/product-card-skeleton';
import { ProductDetailCard } from '@/components/product-detail/product-detail-card';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Skeleton } from '@/components/ui/skeleton';
import { useCart } from '@/lib/cart';

async function fetchProduct(id) {
  const response = await fetch(`/api/menu/${id}`);

  return response.json();
}

function getProductQuery(id, queryClient) {
  return {
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id),
    placeholderData: () =>
      queryClient.getQueryData(['menu', ''])?.find((p) => p.productId === id),
  };
}

function loader(queryClient) {
  return async ({ params }) => {
    try {
      const product = await queryClient.ensureQueryData(
        getProductQuery(params.id, queryClient),
      );

      return product;
    } catch (error) {
      throw new Response(error.message, { status: 500 });
    }
  };
}

function ProductDetail() {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const { data: product } = useQuery(getProductQuery(id, queryClient));
  const { addToCart } = useCart();
  const navigate = useNavigate();

  function handleAddToCart({ product, quantity }) {
    addToCart({ product, quantity });
    navigate('/menu');
  }

  return (
    <>
      <div className="col-span-12 lg:col-span-10 lg:col-start-2">
        <Breadcrumb>
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
                {product?.name}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="col-span-7 lg:col-span-6 lg:col-start-2">
        <div className="flex flex-col gap-4">
          {!product ? (
            <Skeleton className="aspect-square w-full" />
          ) : (
            <img src={`/images/${product.image.url}`} alt={product.image.alt} />
          )}
        </div>
      </div>
      <div className="col-span-5 lg:col-span-4 lg:col-start-8">
        {!product ? (
          <ProductCardSkeleton />
        ) : (
          <ProductDetailCard product={product} onAddToCart={handleAddToCart} />
        )}
      </div>
    </>
  );
}
ProductDetail.loader = loader;

export { ProductDetail };
