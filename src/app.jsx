import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';

import { GlobalLayout } from './global-layout';
import { ErrorPage } from './screens/error-page';
import { CartProvider } from './lib/cart-context';

const Home = lazy(() =>
  import('./screens/home').then((module) => ({ default: module.Home })),
);

function Loading() {
  return (
    <div className="fixed grid h-screen w-screen place-items-center bg-background">
      <Loader2 className="h-12 w-12 animate-spin" />
    </div>
  );
}

const queryClient = new QueryClient();

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
        lazy: async () => {
          const { Menu } = await import('./screens/menu');
          return { Component: Menu, loader: Menu.loader(queryClient) };
        },
      },
      {
        path: '/menu/:id',
        errorElement: <ErrorPage />,
        lazy: async () => {
          const { ProductDetail } = await import('./screens/product-detail');
          return {
            Component: ProductDetail,
            loader: ProductDetail.loader(queryClient),
          };
        },
      },
      {
        path: '/cart',
        errorElement: <ErrorPage />,
        lazy: async () => {
          const { Cart } = await import('./screens/cart');
          return { Component: Cart };
        },
      },
      {
        path: '/checkout',
        errorElement: <ErrorPage />,
        lazy: async () => {
          const { Checkout } = await import('./screens/checkout');
          return { Component: Checkout };
        },
      },
      {
        path: '*',
        errorElement: <ErrorPage />,
        element: <ErrorPage message="404: Page not found!" />,
      },
    ],
  },
]);

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
