import { Link, Outlet } from 'react-router-dom';

function GlobalLayout() {
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto] gap-x-8">
      <header className="sticky top-0 border-b-4 border-foreground bg-white">
        <nav className="container py-4">
          <ul className="flex items-center gap-4">
            <li>
              <Link
                className="block font-black uppercase transition-transform hover:scale-110 hover:drop-shadow-md"
                to="/"
              >
                <img
                  className="h-12 w-12 object-contain p-1"
                  src="/images/logo-burger.png"
                  alt="Yummy! Foods Home"
                  width="237"
                  height="248"
                />
              </Link>
            </li>
            <li>
              <Link
                className="block font-black uppercase transition-transform hover:scale-110 hover:text-red-600"
                to="menu"
              >
                Menu
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
      <footer className="bg-slate-800 text-slate-400">
        <div className="container py-4 text-right">
          Copyright © Yummy! Foods 2024
        </div>
      </footer>
    </div>
  );
}

export { GlobalLayout };
