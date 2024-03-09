import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Root } from "./screens/root";
import { ErrorPage } from "./screens/error-page";
import { Home } from "./screens/home";
import { Menu } from "./screens/menu";
import { ItemDetail } from "./screens/item-detail";
import { Cart } from "./screens/cart";
import { Checkout } from "./screens/checkout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/menu", element: <Menu /> },
      { path: "/menu/:id", element: <ItemDetail /> },
      { path: "/cart", element: <Cart /> },
      { path: "/checkout", element: <Checkout /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export { App };
