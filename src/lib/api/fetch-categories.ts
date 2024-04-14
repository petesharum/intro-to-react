import { Category } from './types';

async function fetchCategories(): Promise<Category[]> {
  const response = await fetch('/api/menu/categories');

  return response.json();
}

export { fetchCategories };
