import { Link } from 'react-router-dom';

import { FiltersSkeleton } from './filters-skeleton';

function CategoryFilters({ isPending, children }) {
  if (isPending) {
    return <FiltersSkeleton />;
  }

  return <ul className="flex flex-col">{children}</ul>;
}

function CategoryFilter({ href, children }) {
  return (
    <li>
      <Link
        className="block font-bold transition hover:translate-x-1 hover:text-red-600"
        to={href}
      >
        {children}
      </Link>
    </li>
  );
}

export { CategoryFilters, CategoryFilter };
