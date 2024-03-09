import { Link, Outlet } from "react-router-dom";

function Root() {
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto] gap-x-8">
      <header className="sticky top-0 border-b-4 border-slate-900 bg-white">
        <nav className="container py-4">
          <ul className="flex gap-4">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="menu">Menu</Link>
            </li>
            <li>
              <Link to="checkout">Checkout</Link>
            </li>
            <li className="ml-auto">
              <Link to="cart">Cart</Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className="container grid grid-cols-12">
        <Outlet />
      </div>
      <footer className="bg-slate-800 text-slate-400">
        <div className="container">footer</div>
      </footer>
    </div>
  );
}

export { Root };
