import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';

import { GlobalLayout } from './layouts/global-layout';
import { ErrorPage } from './screens/error-page';
import { CartProvider } from './lib/cart-provider';

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
  return (
    <div className="fixed grid h-screen w-screen place-items-center bg-background">
      <Loader2 className="h-12 w-12 animate-spin" />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<Loading />}>
        <Home />
      </Suspense>
    ),
  },
  {
    element: <GlobalLayout />,
    children: [
      {
        path: '/menu',
        errorElement: <ErrorPage />,
        element: (
          <Suspense fallback={<Loading />}>
            <Menu />
          </Suspense>
        ),
      },
      {
        path: '/menu/:id',
        errorElement: <ErrorPage />,
        element: (
          <Suspense fallback={<Loading />}>
            <ProductDetail />
          </Suspense>
        ),
      },
      {
        path: '/cart',
        errorElement: <ErrorPage />,
        element: (
          <Suspense fallback={<Loading />}>
            <Cart />
          </Suspense>
        ),
      },
      {
        path: '/checkout',
        errorElement: <ErrorPage />,
        element: (
          <Suspense fallback={<Loading />}>
            <Checkout />
          </Suspense>
        ),
      },
      {
        path: '*',
        errorElement: <ErrorPage />,
        element: <ErrorPage message="404: Page not found!" />,
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
