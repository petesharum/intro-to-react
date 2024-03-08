function Menu() {
  return (
    <div className="flex min-h-dvh flex-col gap-8">
      <header className="sticky top-0 border-b-4 bg-white">
        <div className="container">Header</div>
      </header>
      <div className="container grid flex-1 grid-cols-12">
        <div className="col-span-2">
          <ul className="sticky top-0">
            <li>categories</li>
            <li>categories</li>
            <li>categories</li>
            <li>categories</li>
            <li>categories</li>
            <li>categories</li>
            <li>categories</li>
            <li>categories</li>
          </ul>
        </div>
        <main className="col-span-10 flex flex-col gap-8">
          <div className="flex flex-col gap-6">
            <h2>Category</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div>Menu Item</div>
              <div>Menu Item</div>
              <div>Menu Item</div>
              <div>Menu Item</div>
              <div>Menu Item</div>
              <div>Menu Item</div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <h2>Category</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div>Menu Item</div>
              <div>Menu Item</div>
              <div>Menu Item</div>
              <div>Menu Item</div>
              <div>Menu Item</div>
              <div>Menu Item</div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <h2>Category</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div>Menu Item</div>
              <div>Menu Item</div>
              <div>Menu Item</div>
              <div>Menu Item</div>
              <div>Menu Item</div>
              <div>Menu Item</div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <h2>Category</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div>Menu Item</div>
              <div>Menu Item</div>
              <div>Menu Item</div>
              <div>Menu Item</div>
              <div>Menu Item</div>
              <div>Menu Item</div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <h2>Category</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div>Menu Item</div>
              <div>Menu Item</div>
              <div>Menu Item</div>
              <div>Menu Item</div>
              <div>Menu Item</div>
              <div>Menu Item</div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <h2>Category</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div>Menu Item</div>
              <div>Menu Item</div>
              <div>Menu Item</div>
              <div>Menu Item</div>
              <div>Menu Item</div>
              <div>Menu Item</div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <h2>Category</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div>Menu Item</div>
              <div>Menu Item</div>
              <div>Menu Item</div>
              <div>Menu Item</div>
              <div>Menu Item</div>
              <div>Menu Item</div>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <h2>Category</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div>Menu Item</div>
              <div>Menu Item</div>
              <div>Menu Item</div>
              <div>Menu Item</div>
              <div>Menu Item</div>
              <div>Menu Item</div>
            </div>
          </div>
        </main>
      </div>
      <footer className="bg-slate-800 text-slate-400">
        <div className="container">footer</div>
      </footer>
    </div>
  );
}

export { Menu };
