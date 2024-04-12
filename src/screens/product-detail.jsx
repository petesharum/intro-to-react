import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { fetchProduct } from '@/lib/api';
import { useCart } from '@/lib/cart-context';
import {
  Breadcrumbs,
  ProductCardSkeleton,
  ProductDetailCard,
} from '@/lib/product';
import { Grid, GridColLeft, GridColRight } from '@/lib/shared-components/grid';
import { Skeleton } from '@/lib/ui/skeleton';

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
    <Grid>
      <div className="col-span-12 lg:col-span-10 lg:col-start-2">
        <Breadcrumbs
          path={[{ name: 'Menu', href: '/menu' }, { name: product?.name }]}
        />
      </div>
      <GridColLeft>
        {!product ? (
          <Skeleton className="aspect-square w-full" />
        ) : (
          <img src={`/images/${product.image.url}`} alt={product.image.alt} />
        )}
      </GridColLeft>
      <GridColRight>
        {!product ? (
          <ProductCardSkeleton />
        ) : (
          <ProductDetailCard product={product} onAddToCart={handleAddToCart} />
        )}
      </GridColRight>
    </Grid>
  );
}
ProductDetail.loader = loader;

export { ProductDetail };
