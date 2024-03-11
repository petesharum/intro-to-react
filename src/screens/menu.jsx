import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { Input } from '@/components/ui/input';

function Menu() {
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const url = new URL('/api/items', window.location.origin);

    for (let entry of searchParams.entries()) {
      url.searchParams.append(...entry);
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
      });
  }, [searchParams]);

  useEffect(() => {
    fetch('api/categories')
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      });
  });

  return (
    <>
      <div className="col-span-2">
        <form action="">
          <Input
            name="q"
            type="search"
            placeholder="search"
            defaultValue={searchParams.get('q')}
          />
        </form>
        <ul className="sticky top-0">
          <li key="all">
            <Link to=".">All</Link>
          </li>
          {categories.map((category) => (
            <li key={category.categoryID}>
              <Link to={`?category=${category.categoryID}`}>
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <main className="col-span-10 flex flex-col gap-8">
        <h1>Menu</h1>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {items.map((item) => (
            <Link to={item.productID} key={item.productID}>
              {item.name}
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

export { Menu };
