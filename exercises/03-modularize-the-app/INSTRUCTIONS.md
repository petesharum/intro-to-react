# Exercise 3: Modularize the app

It's helpful to break up your applications into smaller files, or modules. Modules make your code easier to understand by narrowing the scope of concern. Let's break up this app into smaller modules.

## Create a `Title` module

Notice we have created a new folder called `src`. This is where our modules will live.

Inside `index.html`, cut the `Title` function component and paste it into `src/title.js`. At the bottom of the page, add this line:

```js
export { Title };
```

This will allow other JavaScript files to import and execute this code.

## Create an `App` module

Inside `src/app`, create a new function component in this file called `App`, and just like `Title`, export this component at the bottom of the page:

```js
export { App };
```

Copy the element rendered in `index.html` (line 19) and paste inside the body of the `App` function, making sure to return it:

```js
function App() {
    return React.createElement(Title, null, 'Menu');
}
```

Since you're using `Title` in `createElement`, you will need to import it from `./title.js` at the top of the page:

```js
import { Title } from './title.js';
```

Creating a top-level `App` component is a common practice in React. It serves as a place to add global functionality and configuration. Next we'll render this app component.

## Create the bootstrap module

Finally, cut the remaining JavaScript code out of `index.html`, starting with line 16.

Open `src/main.js` and paste the bootstrap code here.

Render the `App` component from `./app.js` in place of what is currently in `React.createElement`.

Finally, in `index.html`, remove anything that's left between the `script` tags inside the `body`. In the opening script tag, add a `src` attribute and set it equal to `./src/main.js`.

Check the result in your browser (`npm run start`, http://localhost:3000). You should see the same result from the last exercise.

🎉🎉 Congratulations! You've just created your first React app.