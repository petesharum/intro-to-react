import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Layout } from './screens/layout';
import { ErrorPage } from './screens/error-page';
import { CartProvider } from './lib/cart/cart-provider';

const Home = lazy(() =>
  import('./screens/home').then((module) => ({ default: module.Home })),
);
const Menu = lazy(() =>
  import('./screens/menu').then((module) => ({ default: module.Menu })),
);
const ProductDetail = lazy(() =>
  import('./screens/product-detail').then((module) => ({
    default: module.ProductDetail,
  })),
);
const Cart = lazy(() =>
  import('./screens/cart').then((module) => ({ default: module.Cart })),
);
const Checkout = lazy(() =>
  import('./screens/checkout').then((module) => ({ default: module.Checkout })),
);

function Loading() {
  return <div>Loading...</div>;
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: '/menu',
        element: (
          <Suspense fallback={<Loading />}>
            <Menu />
          </Suspense>
        ),
      },
      {
        path: '/menu/:id',
        element: (
          <Suspense fallback={<Loading />}>
            <ProductDetail />
          </Suspense>
        ),
      },
      {
        path: '/cart',
        element: (
          <Suspense fallback={<Loading />}>
            <Cart />
          </Suspense>
        ),
      },
      {
        path: '/checkout',
        element: (
          <Suspense fallback={<Loading />}>
            <Checkout />
          </Suspense>
        ),
      },
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </QueryClientProvider>
  );
}

export { App };
