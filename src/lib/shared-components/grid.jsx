function Grid({ children, ...props }) {
  return (
    <div
      className="container grid auto-rows-min grid-cols-12 gap-x-8 gap-y-4 pb-16 pt-8 lg:gap-x-16 lg:gap-y-8"
      {...props}
    >
      {children}
    </div>
  );
}

function GridAside({ children, ...props }) {
  return (
    <aside className="col-span-2 flex flex-col gap-4 pt-8" {...props}>
      {children}
    </aside>
  );
}

function GridMain({ children, ...props }) {
  return (
    <main className="col-span-10 flex flex-col gap-8" {...props}>
      {children}
    </main>
  );
}

function GridColLeft({ children, ...props }) {
  return (
    <div className="col-span-7 lg:col-span-6 lg:col-start-2" {...props}>
      {children}
    </div>
  );
}

function GridColRight({ children, ...props }) {
  return (
    <div className="col-span-5 lg:col-span-4 lg:col-start-8" {...props}>
      {children}
    </div>
  );
}

function GridColFull({ children, ...props }) {
  return (
    <div className="col-span-12 lg:col-span-10 lg:col-start-2" {...props}>
      {children}
    </div>
  );
}

export { Grid, GridAside, GridMain, GridColLeft, GridColRight, GridColFull };
