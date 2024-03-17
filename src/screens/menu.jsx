// TODO: style
import { useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { Input } from '@/components/ui/input';
import { formatMoney } from '@/lib/format-money';
import { useAsync } from '@/lib/use-async';
import { Title } from '@/components/ui/title';

function Menu() {
  const inputRef = useRef(null);
  const {
    data: categories,
    run: categoryRun,
    isLoading: isCategoriesLoading,
  } = useAsync({
    data: [],
  });
  // const [categories, setCategories] = useState([]);
  const {
    data: items,
    run: itemRun,
    isLoading: isItemsLoading,
  } = useAsync({ data: [] });
  // const [items, setItems] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const url = new URL('/api/items', window.location.origin);

    for (let entry of searchParams.entries()) {
      url.searchParams.append(...entry);
    }

    itemRun(fetch(url).then((res) => res.json()));
  }, [itemRun, searchParams]);

  useEffect(() => {
    categoryRun(fetch('api/categories').then((res) => res.json()));
  }, [categoryRun]);

  useEffect(() => {
    if (!inputRef.current) return;

    const search = searchParams.get('q');

    if (!search && inputRef.current.value) {
      inputRef.current.value = '';
    }
  }, [searchParams]);

  return (
    <>
      <div className="col-span-2 flex flex-col gap-4 pt-8">
        <form action="">
          <Input
            ref={inputRef}
            name="q"
            type="search"
            placeholder="search"
            defaultValue={searchParams.get('q')}
          />
        </form>
        {isCategoriesLoading ? (
          <div>Loading...</div>
        ) : (
          <ul className="sticky top-0">
            <li key="all">
              <Link to=".">All</Link>
            </li>
            {categories.map((category) => (
              <li key={category.categoryId}>
                <Link to={`?category=${category.categoryId}`}>
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      <main className="col-span-10 flex flex-col gap-8">
        <Title>Menu</Title>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {isItemsLoading ? (
            <div>Loading...</div>
          ) : items.length === 0 ? (
            <div>No results</div>
          ) : (
            items.map((item) => (
              <Link
                className="flex flex-col gap-2 [&:hover_img]:scale-110"
                to={item.productId}
                key={item.productId}
              >
                <div className="overflow-hidden">
                  <img
                    className="transition-transform"
                    height="300"
                    width="300"
                    src={`/images/${item.image.url}`}
                    alt={item.image.alt}
                  />
                </div>
                <div>
                  <div className="text-lg font-bold">{item.name}</div>
                  <div>{formatMoney(item.price)}</div>
                </div>
              </Link>
            ))
          )}
        </div>
      </main>
    </>
  );
}

export { Menu };
