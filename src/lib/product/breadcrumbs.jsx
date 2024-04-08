import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/lib/ui/breadcrumb';

function Breadcrumbs({ path }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {path.map(({ name, href }, index) => {
          const isCurrentPage = index === path.length - 1;

          if (isCurrentPage) {
            return (
              <BreadcrumbItem key="current-page">
                <BreadcrumbPage className="font-bold">{name}</BreadcrumbPage>
              </BreadcrumbItem>
            );
          }

          return (
            <Fragment key={name}>
              <BreadcrumbLink asChild>
                <Link to={href}>{name}</Link>
              </BreadcrumbLink>
              <BreadcrumbSeparator />
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export { Breadcrumbs };
