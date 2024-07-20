import { Link } from 'react-router-dom';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink as BreadcrumbLinkBase,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/lib/ui/breadcrumb';

function Breadcrumbs({ children }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>{children}</BreadcrumbList>
    </Breadcrumb>
  );
}

function BreadcrumbLink({ children, href }) {
  return (
    <BreadcrumbLinkBase asChild>
      <Link to={href}>{children}</Link>
    </BreadcrumbLinkBase>
  );
}

function BreadcrumbCurrent({ children }) {
  return (
    <BreadcrumbItem>
      <BreadcrumbPage className="font-bold">{children}</BreadcrumbPage>
    </BreadcrumbItem>
  );
}

export {
  Breadcrumbs,
  BreadcrumbLink as Breadcrumb,
  BreadcrumbCurrent,
  BreadcrumbSeparator,
};
