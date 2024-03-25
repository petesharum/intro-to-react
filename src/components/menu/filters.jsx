import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { Input } from '@/components/ui/input';

async function fetchCategories() {
  const response = await fetch('/api/menu/categories');

  return response.json();
}

function Filters() {
  const inputRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  function handleSearchSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const q = formData.get('q');

    setSearchParams({ ...(q.trim() && { q }) });
  }

  useEffect(() => {
    if (!inputRef.current) return;

    const search = searchParams.get('q');

    if (!search && inputRef.current.value) {
      inputRef.current.value = '';
    }
  }, [searchParams]);

  return (
    <>
      <form onSubmit={handleSearchSubmit}>
        <Input
          ref={inputRef}
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
        {categories?.map((category) => (
          <li key={category.categoryId}>
            <Link to={`?category=${category.categoryId}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export { Filters };
