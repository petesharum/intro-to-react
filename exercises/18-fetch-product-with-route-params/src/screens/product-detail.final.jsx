import { useParams } from 'react-router-dom';

import {
  Breadcrumb,
  BreadcrumbCurrent,
  BreadcrumbSeparator,
  Breadcrumbs,
} from '@/lib/product';
import {
  StickyCard,
  StickyCardHeader,
} from '@/lib/shared-components/sticky-card';
import { Title } from '@/lib/shared-components/title';
import { Skeleton } from '@/lib/ui/skeleton';
import { useFetch, Status } from '@/lib/use-fetch';

function ProductDetail() {
  const { id } = useParams();
  const { data: product = { name: '', description: '', image: {} }, status } =
    useFetch(`${window.location.origin}/api/menu/${id}`);
  const isPending = status === Status.PENDING;

  return (
    <div className="container grid auto-rows-min grid-cols-12 gap-x-8 gap-y-4 pb-16 pt-8 lg:gap-x-16 lg:gap-y-8">
      <div className="col-span-12 lg:col-span-10 lg:col-start-2">
        <Breadcrumbs>
          <Breadcrumb href="/menu">Menu</Breadcrumb>
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
  );
}

export { ProductDetail };
