import { useSearchParams } from 'react-router-dom';

import { Title } from '@/lib/shared-components/title';
import {
  MenuItems,
  MenuItem,
  MenuItemsNoResults,
  CategoryFilters,
  CategoryFilter,
  SearchForm,
} from '@/lib/menu';
import { useFetch, Status } from '@/lib/use-fetch';

function Menu() {
  const [searchParams] = useSearchParams();

  const { data: items = [], status: itemsStatus } = useFetch(
    `/api/menu?${searchParams.toString()}`,
  );
  const { data: categories = [], status: categoriesStatus } =
    useFetch(`/api/menu/categories`);
  const hasErrors =
    itemsStatus === Status.REJECTED || categoriesStatus === Status.REJECTED;

  if (hasErrors) {
    return (
      <div className="col-span-full py-8 text-center">
        <p className="text-red-600">
          An error occurred. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="container grid auto-rows-min grid-cols-12 gap-x-8 gap-y-4 pb-16 pt-8 lg:gap-x-16 lg:gap-y-8">
      <aside className="col-span-2 flex flex-col gap-4 pt-8">
        <div className="sticky top-32 flex flex-col gap-4">
          <SearchForm />
          <CategoryFilters isPending={categoriesStatus === Status.PENDING}>
            <CategoryFilter key="all" href=".">
              All
            </CategoryFilter>
            {categories.map((category) => (
              <CategoryFilter
                key={category.categoryId}
                href={`?category=${category.categoryId}`}
              >
                {category.name}
              </CategoryFilter>
            ))}
          </CategoryFilters>
        </div>
      </aside>
      <main className="col-span-10 flex flex-col gap-8">
        <Title>Menu</Title>
        <MenuItems isPending={itemsStatus === Status.PENDING}>
          {items.length === 0 ? (
            <MenuItemsNoResults />
          ) : (
            items.map((menuItem) => (
              <MenuItem
                key={menuItem.productId}
                name={menuItem.name}
                image={menuItem.image}
                price={menuItem.price}
              />
            ))
          )}
        </MenuItems>
      </main>
    </div>
  );
}

export { Menu };
