import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { Input } from '@/components/ui/input';
import { Skeleton } from '../ui/skeleton';

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

  if (!categories)
    return (
      <div className="sticky top-32 flex flex-col gap-4">
        <Skeleton className="h-10 w-full" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-20" />
        </div>
      </div>
    );

  return (
    <div className="sticky top-32 flex flex-col gap-4">
      <form onSubmit={handleSearchSubmit}>
        <Input
          ref={inputRef}
          name="q"
          type="search"
          placeholder="search"
          defaultValue={searchParams.get('q')}
        />
      </form>
      <ul className="flex flex-col">
        <li key="all">
          <Link
            className="block font-bold transition hover:translate-x-1 hover:text-red-600"
            to="."
          >
            All
          </Link>
        </li>
        {categories.map((category) => (
          <li key={category.categoryId}>
            <Link
              className="block font-bold transition hover:translate-x-1 hover:text-red-600"
              to={`?category=${category.categoryId}`}
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export { Filters };
