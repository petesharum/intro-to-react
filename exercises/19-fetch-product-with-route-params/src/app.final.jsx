import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Menu } from './menu';
import { Home } from './home';
import { ErrorPage } from './error-page';
import { ProductDetail } from './product-detail';

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
