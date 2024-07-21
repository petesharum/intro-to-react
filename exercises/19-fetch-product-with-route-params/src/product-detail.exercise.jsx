import { Link } from 'react-router-dom';

import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/lib/ui/breadcrumb';
import {
  StickyCard,
  StickyCardHeader,
} from '@/lib/shared-components/sticky-card';
import { Title } from '@/lib/shared-components/title';
import { Skeleton } from '@/lib/ui/skeleton';

function Breadcrumbs({ children }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>{children}</BreadcrumbList>
    </Breadcrumb>
  );
}

function BreadcrumbCurrent({ children }) {
  return (
    <BreadcrumbItem>
      <BreadcrumbPage className="font-bold">{children}</BreadcrumbPage>
    </BreadcrumbItem>
  );
}

function ProductDetail() {
  const product = { name: '', description: '', image: {} };
  const isPending = true;

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto] gap-x-8">
      <header className="sticky top-0 border-b-4 border-foreground bg-white">
        <nav className="container py-4">
          <ul className="flex items-center gap-4">
            <li>
              <Link
                className="block font-black uppercase transition-transform hover:scale-110 hover:drop-shadow-md"
                to="/"
              >
                <img
                  className="h-12 w-12 object-contain p-1"
                  src="/images/logo-burger.png"
                  alt="Yummy! Foods Home"
                  width="237"
                  height="248"
                />
              </Link>
            </li>
            <li>
              <Link
                className="block font-black uppercase transition-transform hover:scale-110 hover:text-red-600"
                to="/menu"
              >
                Menu
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className="container grid auto-rows-min grid-cols-12 gap-x-8 gap-y-4 pb-16 pt-8 lg:gap-x-16 lg:gap-y-8">
        <div className="col-span-12 lg:col-span-10 lg:col-start-2">
          <Breadcrumbs>
            <BreadcrumbLink asChild>
              <Link to="/menu">Menu</Link>
            </BreadcrumbLink>
            <BreadcrumbSeparator />
            <BreadcrumbCurrent>{product.name}</BreadcrumbCurrent>
          </Breadcrumbs>
        </div>
        <div className="col-span-7 lg:col-span-6 lg:col-start-2">
          {isPending ? (
            <Skeleton className="aspect-square w-full" />
          ) : (
            <img src={`/images/${product.image.url}`} alt={product.image.alt} />
          )}
        </div>
        <div className="col-span-5 lg:col-span-4 lg:col-start-8">
          <StickyCard isPending={isPending}>
            <StickyCardHeader>
              <Title>{product.name}</Title>
              <p>{product.description}</p>
            </StickyCardHeader>
          </StickyCard>
        </div>
      </div>
      <footer className="bg-slate-800 text-slate-400">
        <div className="container py-4 text-right">
          Copyright © Yummy! Foods 2024
        </div>
      </footer>
    </div>
  );
}

export { ProductDetail };
