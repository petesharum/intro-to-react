import { fetchProduct } from '@/lib/api';

function getProductQuery(id, queryClient) {
  return {
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id),
    placeholderData: () =>
      queryClient.getQueryData(['menu', ''])?.find((p) => p.productId === id),
  };
}

export { getProductQuery };
