# Exercise 21: Fix a Search Form Bug

Well, you knew it would happen sooner or later. We had our first bug report. 😭

Here it is in full:

```
## Steps to reproduce

1. Go to the `/menu` page.
2. Search for a menu item in the search input (e.g. "chee"). The page shows the filtered items.
3. Click on a category filter.

## Expected

The page should show the items associated with the category. Additionally, the search input should be cleared out.

## Actual

The search input is NOT cleared out.
```

Before moving on, we need to figure out how to fix this bug.
  
## Strategy

The search form should clear when there is no `q` search parameter. That means we need a way to listen to changes in search parameters. `useSearchParams` already does that, so that's one requirement met.

Next, we need to react to these changes. `searchParams` are a concern outside of React. We've learned that, if we want to synchronize with state outside of React (i.e. an Effect), we need to use `useEffect`.

So we should run a `useEffect` that checks for the `q` search param and, if `q` is empty, clear out the search input somehow. The `HTMLInputElement` DOM API allows you to set an input's value easily, but how do we safely target a DOM element directly in React?

Lucky for us, React provides a way to directly access the underlying DOM with [`useRef`](https://react.dev/reference/react/useRef). Among [other things](https://react.dev/reference/react/useRef#referencing-a-value-with-a-ref), `useRef` allows us to [manipulate the DOM directly](https://react.dev/reference/react/useRef#manipulating-the-dom-with-a-ref), so we can do things like clear out an input element's `value` attribute.

## Adding an input ref

- [`src/lib/menu/search-form.exercise.jsx`](./src/lib/menu/search-form.exercise.jsx)
- [`useRef` docs](https://react.dev/reference/react/useRef)

1. Open [`src/lib/menu/search-form.exercise.jsx`](./src/lib/menu/search-form.exercise.jsx). Our menu search form has been conveniently moved to a lib in order to make it easier to work on.
2. Import `useRef` from `react`.
3. Inside `SearchForm` create a new variable called `inputRef` and set it equal to `useRef(null)`. 
   
   We'll use this variable to store our ref, which can be accessed with the `.current` property (`inputRef.current`). We have initialized the ref to `null`.

4. Set the `ref` prop of `Input` equal to the new `inputRef`. `ref` is a reserved prop name in React meant for passing refs.

Now that we have our ref, we'll clear the input inside a `useEffect`.

## Clearing the input

1. Under the `handleSearchSubmit` function, add a new `useEffect`. Don't forget to add the dependency array.
2. Inside the `useEffect`, first check if `inputRef.current` exists. If it doesn't, simply return.
   
   It's always a good idea to check if the ref exists before attempting to use it. Otherwise, you could have an unhandled exception on your hands.

3. After the early return, get the value for the `q` search param.
4. If `q` is blank and `inputRef.current.value` is not, set `inputRef.current.value` equal to `''`.
5. Since we reference `searchParams`, you should add that to the `useEffect` dependecy array. You don't need to add refs.

Test your fix out by first searching for a menu item on the menu page, then clicking a category filter. The search input should not clear itself.

Congratulations on squashing your first bug! We're now ready to put the finishing touches on our website before launch.