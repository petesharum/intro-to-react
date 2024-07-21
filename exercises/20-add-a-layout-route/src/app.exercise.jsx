import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Menu } from './screens/menu';
import { Home } from './screens/home';
import { ErrorPage } from './screens/error-page';
import { ProductDetail } from './screens/product-detail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu/:id" element={<ProductDetail />} />
        <Route
          path="*"
          element={<ErrorPage message="404: Page not found!" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export { App };
