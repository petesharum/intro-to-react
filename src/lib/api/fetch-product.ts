import { Product } from './types';

async function fetchProduct(id: string): Promise<Product> {
  const response = await fetch(`/api/menu/${id}`);

  return response.json();
}

export { fetchProduct };
