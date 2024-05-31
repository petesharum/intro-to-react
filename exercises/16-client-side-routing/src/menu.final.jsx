import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Input } from '@/lib/ui/input';

import { Title } from './title';
import { MenuItem, MenuItems, MenuItemsNoResults } from './menu-items';
import { CategoryFilter, CategoryFilters } from './category-filters';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

function useFetch(url, initialData = null) {
  const [status, setStatus] = useState(Status.IDLE);
  const [data, setData] = useState(initialData);

  useEffect(() => {
    let ignore = false;

    setStatus(Status.PENDING);

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (!ignore) {
          setData(data);
          setStatus(Status.RESOLVED);
        }
      })
      .catch(() => {
        setStatus(Status.REJECTED);
      });

    return () => {
      ignore = true;
    };
  }, [url]);

  return { data, status };
}

function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q');

  const { data: items, status: itemsStatus } = useFetch(
    `${window.location.origin}/api/menu${window.location.search}`,
    [],
  );
  const { data: categories, status: categoriesStatus } = useFetch(
    `${window.location.origin}/api/menu/categories`,
    [],
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const search = { q: formData.get('q') };

    setSearchParams(search);
  };

  if (itemsStatus === Status.REJECTED || categoriesStatus === Status.REJECTED) {
    return (
      <div className="container py-8 text-center">
        <p className="text-red-600">
          An error occurred. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto] gap-x-8">
      <header className="sticky top-0 border-b-4 border-foreground bg-white">
        <div className="container py-4">
          <img
            className="h-12 w-12 object-contain p-1"
            src="/images/logo-burger.png"
            alt="Yummy! Foods Home"
            width="237"
            height="248"
          />
        </div>
      </header>
      <div className="container grid auto-rows-min grid-cols-12 gap-x-8 gap-y-4 pb-16 pt-8 lg:gap-x-16 lg:gap-y-8">
        <aside className="col-span-2 flex flex-col gap-4 pt-8">
          <div className="sticky top-32 flex flex-col gap-4">
            <form onSubmit={handleSubmit}>
              <Input
                name="q"
                type="search"
                placeholder="search"
                defaultValue={query}
              />
            </form>
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
      <footer className="bg-slate-800 text-slate-400">
        <div className="container py-4 text-right">
          Copyright © Yummy! Foods 2024
        </div>
      </footer>
    </div>
  );
}

export { Menu };
