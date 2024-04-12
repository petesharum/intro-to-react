function Grid(props) {
  return (
    <div
      className="container grid auto-rows-min grid-cols-12 gap-x-8 gap-y-4 pb-16 pt-8 lg:gap-x-16 lg:gap-y-8"
      {...props}
    />
  );
}

function GridColLeft(props) {
  return <div className="col-span-7 lg:col-span-6 lg:col-start-2" {...props} />;
}

function GridColRight(props) {
  <div className="col-span-5 lg:col-span-4 lg:col-start-8" {...props} />;
}

export { Grid, GridColLeft, GridColRight };
