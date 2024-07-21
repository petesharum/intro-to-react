# Exercise 18: Handle Search Params

- [src/menu.exercise.jsx](./src/menu.exercise.jsx)

1. In [src/menu.exercise.jsx](./src/menu.exercise.jsx), import `useSearchParams` from `react-router-dom`.
2. In the body of the `Menu` component, replace the `URLSearchParams` instantiation with a call to [`useSearchParams`](https://reactrouter.com/en/main/hooks/use-search-params). This hook returns a tuple of the current search params and a set function. You'll need both.
3. Inside the first `useFetch`, replace the `window.location.search` with `searchParams.toString()`.
4. create submit handler