# Exercise 5: Convert HTML to JSX

So far, we've been directly using React's `createElement` to create components. While it's technically possible to build React apps this way, using `createElement` becomes less convenient with more complex markup. JSX is meant to make creating and composing elements in React as easy as writing HTML.

## Explore the project

Before beginning this exercise, take the time to explore the changes to our initial Vite project.

Some things to note:

1. We have added several resources in `public/`, which will be used in future exercises.
2. In `src/`, we have restored our previous `app`, `menu`, and `title` files, but now they have a `.jsx` extension.
3. We are using Tailwind, which uses predefined classes to add styles to elements.

## Convert to JSX

- `src/title.exercise.jsx`
- `src/menu.html`
- `src/menu.exercise.jsx`
- `src/app.exercise.jsx`

1. In `src/title.exercise.jsx`, return a `<h1>` with the classes `text-4xl font-black uppercase tracking-wider`. Don't forget to pass the `children`.
2. Next, we'll convert the HTML in `src/menu.html` to JSX and return that in `src/menu.exercise.jsx`. Remember to address the differences JSX vs. HTML.
3. While still in `src/menu.exercise.jsx`, import the `Title` component from `./title` and replace the `<h1>` with it.
4. Finally, in `src/app.exercise.jsx`, replace the returned `<Title />` component with `<Menu />`.
