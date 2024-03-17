import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Layout } from './screens/layout';
import { ErrorPage } from './screens/error-page';
import { Home } from './screens/home';
import { Menu } from './screens/menu';
import { ProductDetail } from './screens/product-detail';
import { Cart } from './screens/cart';
import { Checkout } from './screens/checkout';
import { CartProvider } from './lib/cart/cart-provider';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/menu', element: <Menu /> },
      { path: '/menu/:id', element: <ProductDetail /> },
      { path: '/cart', element: <Cart /> },
      { path: '/checkout', element: <Checkout /> },
    ],
  },
]);

function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  );
}

export { App };
