import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Root } from './screens/root';
import { ErrorPage } from './screens/error-page';
import { Home } from './screens/home';
import { Menu } from './screens/menu';
import { ProductDetail } from './screens/product-detail';
import { Cart } from './screens/cart';
import { Checkout } from './screens/checkout';
import { CartProvider } from './data/cart/cart-provider';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
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
