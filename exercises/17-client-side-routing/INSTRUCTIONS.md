# Exercise 17: Client Side Routing

I don't know if you've noticed, but we've only worked on a single page so far. We'll change that now with some client side routing.

Our UI team has been hard at work cranking out a new, inviting home page and a helpful error page (just in case our users get lost). All that's left is to stitch everything together using React Router.

- [src/app.exercise.jsx](./src/app.exercise.jsx)
- [src/category-filters.exercise.jsx](./src/category-filters.exercise.jsx)
- [src/home.exercise.jsx](./src/home.exercise.jsx)
- [src/menu.exercise.jsx](./src/menu.exercise.jsx)
- [React Router v6 docs](https://reactrouter.com/)

## Create the app router

1. In [src/app.exercise.jsx](./src/app.exercise.jsx), import `BrowserRouter`, `Routes`, and `Route` from `react-router-dom`.
2. Inside the `App` component, replace the return value with an instance of `<BrowserRouter>`. This component keeps tabs on the browser's location and orchestrates navgation.
3. Inside the `<BrowserRouter>`, add an instance of `<Routes>`. This component decides which of its `Route` children to render by matching the current browser route to the child `Route` paths.
4. 

## Add `<Link>`s