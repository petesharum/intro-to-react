# Exercise 18: Handle Search Params

Before starting this next exercise, check out the `src` folder. We've moved all of the main screens into a `screens` directory, and moved the rest of the files into the `lib` folder. This helps cut down on some of the noise that comes from a flat filing structure.

1. Open up [src/menu.exercise.jsx](./src/menu.exercise.jsx) and import `useSearchParams` and `Link` from `react-router-dom`.
2. In the body of the `Menu` component, replace the `URLSearchParams` instantiation with a call to [`useSearchParams`](https://reactrouter.com/en/main/hooks/use-search-params). This hook returns a tuple of the current search params and a set function. You'll need both.
3. Inside the first `useFetch`, replace the `window.location.search` with `searchParams.toString()`.
4. Finally, inside of `handleSubmit`, 