import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import { Grid, GridAside, GridMain } from '@/lib/shared-components/grid';
import { Title } from '@/lib/shared-components/title';
import {
  MenuItems,
  MenuItem,
  MenuItemsNoResults,
  CategoryFilters,
  CategoryFilter,
  getCategoryListQuery,
  getMenuItemListQuery,
  SearchForm,
  StickySidebar,
} from '@/lib/menu';

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
        <MenuItems>
          {items.length === 0 ? (
            <MenuItemsNoResults />
          ) : (
            items.map((item) => <MenuItem key={item.productId} {...item} />)
          )}
        </MenuItems>
      </GridMain>
    </Grid>
  );
}
Menu.loader = loader;

export { Menu };
