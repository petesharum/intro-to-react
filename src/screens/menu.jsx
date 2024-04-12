import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import { fetchCategories, fetchMenuItems } from '@/lib/api';
import { Grid, GridAside, GridMain } from '@/lib/shared-components/grid';
import { Title } from '@/lib/shared-components/title';
import {
  MenuItem,
  MenuItemSkeleton,
  CategoryFilters,
  CategoryFilter,
  SearchForm,
  StickySidebar,
} from '@/lib/menu';

function renderMenuItems(items) {
  if (!items) {
    return Array.from({ length: 8 }).map((_, i) => (
      <MenuItemSkeleton key={i} />
    ));
  }

  if (items.length === 0) {
    return <div>No results</div>;
  }

  return items.map((item) => <MenuItem key={item.productId} {...item} />);
}

function getCategoryListQuery() {
  return {
    queryKey: ['categories'],
    queryFn: fetchCategories,
  };
}

function getMenuItemListQuery(searchParams) {
  return {
    queryKey: ['menu', searchParams.toString()],
    queryFn: () => fetchMenuItems(searchParams),
  };
}

function loader(queryClient) {
  return async ({ request }) => {
    const url = new URL(request.url);
    const categoryListQuery = getCategoryListQuery();
    const menuItemListQuery = getMenuItemListQuery(url.searchParams);

    const categoriesPromise = queryClient.ensureQueryData(categoryListQuery);
    const itemsPromise = queryClient.ensureQueryData(menuItemListQuery);

    try {
      const [categories, items] = await Promise.all([
        categoriesPromise,
        itemsPromise,
      ]);

      return { categories, items };
    } catch (error) {
      throw new Response(error.message, { status: 500 });
    }
  };
}

function Menu() {
  const [searchParams] = useSearchParams();
  const { data: categories } = useQuery(getCategoryListQuery());
  const { data: items } = useQuery(getMenuItemListQuery(searchParams));

  return (
    <Grid>
      <GridAside>
        <StickySidebar>
          <SearchForm />
          <CategoryFilters isPending={!categories}>
            <CategoryFilter key="all" href=".">
              All
            </CategoryFilter>
            {categories?.map((category) => (
              <CategoryFilter
                key={category.categoryId}
                href={`?category=${category.categoryId}`}
              >
                {category.name}
              </CategoryFilter>
            ))}
          </CategoryFilters>
        </StickySidebar>
      </GridAside>
      <GridMain>
        <Title>Menu</Title>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
          {renderMenuItems(items)}
        </div>
      </GridMain>
    </Grid>
  );
}
Menu.loader = loader;

export { Menu };
