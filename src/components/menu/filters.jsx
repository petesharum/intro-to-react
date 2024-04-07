import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { Input } from '@/components/ui/input';

function Filters({ categories }) {
  const inputRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();

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
    </>
  );
}

export { Filters };
