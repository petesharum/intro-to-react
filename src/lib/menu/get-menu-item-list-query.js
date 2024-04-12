import { fetchMenuItems } from '@/lib/api';

function getMenuItemListQuery(searchParams) {
  return {
    queryKey: ['menu', searchParams.toString()],
    queryFn: () => fetchMenuItems(searchParams),
  };
}

export { getMenuItemListQuery };
