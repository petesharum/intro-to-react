import { fetchCategories } from '@/lib/api';

function getCategoryListQuery() {
  return {
    queryKey: ['categories'],
    queryFn: fetchCategories,
  };
}

export { getCategoryListQuery };
